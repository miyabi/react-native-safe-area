//
//  RNSafeArea.h
//  RNSafeArea
//
//  Created by Masayuki Iwai on 2017/09/13.
//  Copyright © 2017 Masayuki Iwai. All rights reserved.
//

#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTUtils.h>

#define RNSafeAreaInsetsForRootViewDidChangeNotification @"RNSafeAreaInsetsForRootViewDidChangeNotification"

@interface RNSafeArea : RCTEventEmitter<RCTBridgeModule>

@end
