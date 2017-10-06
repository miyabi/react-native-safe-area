/**
 * @flow
 */
'use strict'

import { NativeModules, NativeEventEmitter } from 'react-native'
import type EmitterSubscription from 'EmitterSubscription'

export type SafeAreaInsets = { top: number, left: number, bottom: number, right: number };

const nativeModule = NativeModules.RNSafeArea
const nativeEventEmitter = new NativeEventEmitter(nativeModule)

class SafeArea {
  getSafeAreaInsetsForRootView(): Promise<{ safeAreaInsets: SafeAreaInsets }> {
    return nativeModule.getSafeAreaInsetsForRootView()
  }

  addEventListener(eventType: string, listener: Function, context: ?Object): ?EmitterSubscription {
    return nativeEventEmitter.addListener(eventType, listener, context)
  }

  removeEventListener(eventType: string, listener: Function): void {
    nativeEventEmitter.removeListener(eventType, listener)
  }
}

export default new SafeArea()
