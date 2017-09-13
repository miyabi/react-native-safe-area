//
//  RNSafeArea.m
//  RNSafeArea
//
//  Created by Masayuki Iwai on 2017/09/13.
//  Copyright © 2017 Masayuki Iwai. All rights reserved.
//

#import "RNSafeArea.h"

@implementation RNSafeArea

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getSafeAreaInsetsForRootView:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIEdgeInsets safeAreaInsets = UIEdgeInsetsMake(0, 0, 0, 0);
        UIWindow *window = RCTSharedApplication().keyWindow;
        if (window) {
            UIViewController *rootViewController = window.rootViewController;
            if (rootViewController && rootViewController.view) {
                if ([[NSProcessInfo processInfo] isOperatingSystemAtLeastVersion:(NSOperatingSystemVersion){ 11, 0, 0 }]) {
                    safeAreaInsets = rootViewController.view.safeAreaInsets;
                }
            }
        }
        
        resolve(@{
            @"safeAreaInsets": @{
                @"top": @(safeAreaInsets.top),
                @"left": @(safeAreaInsets.left),
                @"bottom": @(safeAreaInsets.bottom),
                @"right": @(safeAreaInsets.right),
            },
        });
    });
}

@end
