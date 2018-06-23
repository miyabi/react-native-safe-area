//
//  RNSafeArea.m
//  RNSafeArea
//
//  Created by Masayuki Iwai on 2017/09/13.
//  Copyright © 2017 Masayuki Iwai. All rights reserved.
//

#import "RNSafeArea.h"
#import <React/RCTRootView.h>

@implementation RNSafeArea

BOOL statusBarHiddenInitially = NO;

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getSafeAreaInsetsForRootView:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIEdgeInsets safeAreaInsets = [self safeAreaInsetsForRootView];
        resolve([self constructResult:safeAreaInsets]);
    });
}

#pragma mark -

- (id)init {
    if ((self = [super init])) {
        statusBarHiddenInitially = [[[NSBundle mainBundle] objectForInfoDictionaryKey:@"UIStatusBarHidden"] boolValue];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (CGFloat)statusBarHeight {
    UIApplication *sharedApplication = RCTSharedApplication();
    
    if (statusBarHiddenInitially && sharedApplication.isStatusBarHidden) {
        return 0.0f;
    }
    
    UIWindow *window = sharedApplication.keyWindow;
    if (window) {
        UIViewController *rootViewController = window.rootViewController;
        if (rootViewController) {
            if (rootViewController.prefersStatusBarHidden) {
                return 0.0f;
            }
        }
    }
    
    // TODO: It would be better to use sharedApplication.statusBarFrame.size.height,
    // but it has unexpected value at this time.
    return 20.0f;
}

- (UIEdgeInsets)safeAreaInsetsForView:(UIView *)view {
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 110000
    if (@available(iOS 11.0, *)) {
        if (view) {
            return view.safeAreaInsets;
        }
    }
#endif
    
    UIEdgeInsets safeAreaInsets = UIEdgeInsetsMake(0, 0, 0, 0);
    
    if (view) {
        if ([view isKindOfClass:[RCTRootView class]]) {
            safeAreaInsets.top = [self statusBarHeight];
        }
    }
    
    return safeAreaInsets;
}

- (UIEdgeInsets)safeAreaInsetsForRootView {
    UIView *rootView = nil;
    
    UIWindow *window = RCTSharedApplication().keyWindow;
    if (window) {
        UIViewController *rootViewController = window.rootViewController;
        if (rootViewController) {
            rootView = rootViewController.view;
        }
    }
    
    return [self safeAreaInsetsForView:rootView];
}

- (NSDictionary *)constructResult:(UIEdgeInsets)safeAreaInsets {
    return @{
             @"safeAreaInsets": @{
                     @"top": @(safeAreaInsets.top),
                     @"left": @(safeAreaInsets.left),
                     @"bottom": @(safeAreaInsets.bottom),
                     @"right": @(safeAreaInsets.right),
                     },
             };
}

- (void)notifySafeAreaInsetsForRootViewDidChange:(UIEdgeInsets)safeAreaInsets {
    [self sendEventWithName:@"safeAreaInsetsForRootViewDidChange" body:[self constructResult:safeAreaInsets]];
}

#pragma mark - RCTEventEmitter implementation

- (NSArray<NSString *> *)supportedEvents {
    return @[@"safeAreaInsetsForRootViewDidChange"];
}

- (void)startObserving {
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 110000
    if (@available(iOS 11.0, *)) {
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(safeAreaInsetsForRootViewDidChange:)
                                                     name:RNSafeAreaInsetsForRootViewDidChangeNotification
                                                   object:nil];
        return;
    }
#endif
    
    // Fallback for older version of iOS
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(applicationDidChangeStatusBarFrame:)
                                                 name:UIApplicationDidChangeStatusBarFrameNotification
                                               object:nil];
}

- (void)stopObserving {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)safeAreaInsetsForRootViewDidChange:(NSNotification *)notification {
    RCTRootView *rootView = (RCTRootView *)notification.object;
    UIEdgeInsets safeAreaInsets = [self safeAreaInsetsForView:rootView];
    [self notifySafeAreaInsetsForRootViewDidChange:safeAreaInsets];
}

- (void)applicationDidChangeStatusBarFrame:(NSNotification *)notification {
    UIEdgeInsets safeAreaInsets = [self safeAreaInsetsForRootView];
    [self notifySafeAreaInsetsForRootViewDidChange:safeAreaInsets];
}

@end
