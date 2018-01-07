# react-native-safe-area

React Native module to retrieve safe area insets for iOS 11 or later.

## Installation

### 1. Install library from `npm`

```shell
npm install --save react-native-safe-area
```

### 2. Link native code

You can link native code in the way you prefer:

#### CocoaPods

Add line to your project target section in your Podfile:

```diff
+ pod 'react-native-safe-area', path: '../node_modules/react-native-safe-area'
```

#### react-native link

Run command below:

```shell
react-native link react-native-safe-area
```

## Usage

```jsx
import SafeArea from 'react-native-safe-area'
```

If you want to use `SafeAreaInsets` type, you can import it like below:

```jsx
import SafeArea, { type SafeAreaInsets } from 'react-native-safe-area'
```

### Retrieve safe area insets for root view

```jsx
SafeArea.getSafeAreaInsetsForRootView()
  .then((result) => {
    console.log(result)
    // { safeAreaInsets: { top: 44, left: 0, bottom: 34, right: 0 } }
  })
```

### Handle safe area insets changed event

```jsx
class App extends Component<{}> {
  // To keep the context of 'this'
  onSafeAreaInsetsForRootViewChange = this.onSafeAreaInsetsForRootViewChange.bind(this)

  componentDidMount() {
    // Add event listener
    SafeArea.addEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsForRootViewChange)
  }

  componentWillUnmount() {
    // Remove event listener
    SafeArea.removeEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsForRootViewChange)
  }

  onSafeAreaInsetsForRootViewChange(result) {
    // Called every time that safe area insets changed
    console.log(result)
    // { safeAreaInsets: { top: 0, left: 44, bottom: 21, right: 44 } }
  }
}
```

## Examples

A simple example project is [here](./Examples/RNSafeAreaExample).
