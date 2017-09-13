# react-native-safe-area
React Native module to get Safe Area Insets for iOS 11 or later.

# How to use

```jsx
import SafeArea from 'react-native-safe-area'

SafeArea.getSafeAreaInsetsForRootView()
  .then((result) => {
    console.log(result) // { safeAreaInsets: { bottom: 0, top: 0, left: 0, right: 0 } }
  })
```
