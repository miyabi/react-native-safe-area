//
//  RCTRootView+SafeArea.m
//  RNSafeArea
//
//  Created by Masayuki Iwai on 2017/10/06.
//  Copyright © 2017 Masayuki Iwai. All rights reserved.
//

#import "RCTRootView+SafeArea.h"
#import "RNSafeArea.h"

@implementation RCTRootView (SafeArea)

- (void)safeAreaInsetsDidChange {
    [[NSNotificationCenter defaultCenter] postNotificationName:RNSafeAreaInsetsForRootViewDidChangeNotification
                                                        object:self];
}

@end
