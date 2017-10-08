/**
 * @flow
 */
'use strict'

import { NativeModules, NativeEventEmitter, Platform } from 'react-native'
import type EmitterSubscription from 'EmitterSubscription'

export type SafeAreaInsets = { top: number, left: number, bottom: number, right: number };

const nativeModule = NativeModules.RNSafeArea
const nativeEventEmitter = new NativeEventEmitter(nativeModule)

class SafeArea {
  getSafeAreaInsetsForRootView(): Promise<{ safeAreaInsets: SafeAreaInsets }> {
    return parseInt(Platform.Version, 10) >= 11
      ? nativeModule.getSafeAreaInsetsForRootView()
      : { top: 20, left: 0, bottom: 0, right: 0 }
  }

  addEventListener(eventType: string, listener: Function, context: ?Object): ?EmitterSubscription {
    return nativeEventEmitter.addListener(eventType, listener, context)
  }

  removeEventListener(eventType: string, listener: Function): void {
    nativeEventEmitter.removeListener(eventType, listener)
  }
}

export default new SafeArea()
