/**
 * @flow
 */
'use strict'

import type EmitterSubscription from 'EmitterSubscription'

class SafeArea {
  getSafeAreaInsetsForRootView(): Promise<{
    safeAreaInsets: { top: number, left: number, bottom: number, right: number },
  }> {
    return Promise.resolve({ safeAreaInsets: { top: 0, left: 0, bottom: 0, right: 0 } })
  }

  addEventListener(eventType: string, listener: Function, context: ?Object): ?EmitterSubscription {
    return null
  }

  removeEventListener(eventType: string, listener: Function): void {
  }
}

export default new SafeArea()
