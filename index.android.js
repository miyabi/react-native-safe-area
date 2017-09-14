'use strict'

class SafeArea {
  getSafeAreaInsetsForRootView() {
    return Promise.resolve({ safeAreaInsets: { top: 0, left: 0, bottom: 0, right: 0 } })
  }
}

module.exports = new SafeArea()
