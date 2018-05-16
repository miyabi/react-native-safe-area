// @flow

import { NativeModules, NativeEventEmitter } from 'react-native'
import type EmitterSubscription from 'EmitterSubscription'
import type { SafeAreaInsets } from './TypeDefinition'

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
