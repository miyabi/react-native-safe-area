# react-native-safe-area

React Native module to handle safe area insets natively for iOS 11 or later.

![rnsf](https://user-images.githubusercontent.com/143255/40108466-e64b18d8-5935-11e8-992d-7fa7a636d129.gif)

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
target 'YourProjectTarget' do

+   pod 'react-native-safe-area', path: '../node_modules/react-native-safe-area'

end
```

If you received error `jest-haste-map: Haste module naming collision: Duplicate module name: react-native`, add lines below to your Podfile and reinstall pods.

```diff
target 'YourProjectTarget' do

+   rn_path = '../node_modules/react-native'
+   pod 'yoga', path: "#{rn_path}/ReactCommon/yoga/yoga.podspec"
+   pod 'React', path: rn_path

  pod 'react-native-safe-area', path: '../node_modules/react-native-safe-area'

end

+ post_install do |installer|
+   installer.pods_project.targets.each do |target|
+     if target.name == "React"
+       target.remove_from_project
+     end
+   end
+ end
```

#### react-native link

Run command below:

```shell
react-native link react-native-safe-area
```

## Usage

### Work with views

Use `withSafeArea` to apply safe area insets to views automatically.

```jsx
import { withSafeArea } from 'react-native-safe-area'
```

#### withSafeArea(component[, applyTo][, direction])

A higher-order component which applies safe area insets automatically to the wrapped component.

- `component` : *Component* - Wrapped component.
- `applyTo` : *string* - (Optional) Specify property to apply safe area insets.
    - `margin` - `style.margin`. (Default)
    - `padding` - `style.padding`.
    - `absolutePosition` - `style.top`, `style.bottom`, `style.left` and `style.right`.
    - `contentInset` - `contentInset` and `contentOffset` for scroll views.
- `direction` : *string* - (Optional) Specify direction to apply safe area insets.
    - `top` - Apply to top.
    - `bottom` - Apply to bottom.
    - `left` - Apply to left.
    - `right` - Apply to right.
    - `topAndLeft` - `top` + `left`.
    - `topAndRight` - `top` + `right`.
    - `bottomAndLeft` - `bottom` + `left`.
    - `bottomAndRight` - `bottom` + `right`.
    - `horizontal` - `left` + `right`.
    - `horizontalAndTop` - `horizontal` + `top`.
    - `horizontalAndBottom` - `horizontal` + `bottom`.
    - `vertical` - `top` + `bottom`.
    - `verticalAndLeft` - `vertical` + `left`.
    - `verticalAndRight` - `vertical` + `right`.
    - `all` - `horizontal` + `vertical`. (Default)

##### Simple view example

```jsx
const SafeAreaView = withSafeArea(View, 'margin', 'all')

class App extends Component<{}> {
  render() {
    return (
      <SafeAreaView>
        <View />
      </SafeAreaView>
    )
  }
}
```

##### ScrollView example

```jsx
const SafeAreaScrollView = withSafeArea(ScrollView, 'contentInset', 'vertical')

class App extends Component<{}> {
  render() {
    return (
      <SafeAreaScrollView>
        <View />
      </SafeAreaScrollView>
    )
  }
}
```

You can also apply safe area insets to FlatList and SectionList.

#### Enhanced component's APIs

##### get `wrappedRef` : *ref*

Returns wrapped component's ref.

##### get `currentSafeAreaInsets` : *SafeAreaInsets*

Returns current safe area insets.

---

### Handle safe area manually

```jsx
import SafeArea from 'react-native-safe-area'
```

If you want to use `SafeAreaInsets` type, you can import it like below:

```jsx
import SafeArea, { type SafeAreaInsets } from 'react-native-safe-area'
```

#### Retrieve safe area insets for root view

```jsx
SafeArea.getSafeAreaInsetsForRootView()
  .then((result) => {
    console.log(result)
    // { safeAreaInsets: { top: 44, left: 0, bottom: 34, right: 0 } }
  })
```

#### Handle safe area insets changed event

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
