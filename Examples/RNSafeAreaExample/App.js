/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SafeArea, { type SafeAreaInsets } from 'react-native-safe-area'

type Props = {};
type State = {
  safeAreaInsets: SafeAreaInsets,
};

export default class App extends Component<Props, State> {
  state = {
    safeAreaInsets: {
      top:0, left: 0, bottom: 0, right: 0,
    },
  }

  // To keep the context of 'this'
  onSafeAreaInsetsForRootViewChange = this.onSafeAreaInsetsForRootViewChange.bind(this)

  componentWillMount() {
    // Set initial safe area insets
    SafeArea.getSafeAreaInsetsForRootView()
      .then((result) => {
        const { safeAreaInsets } = result
        this.setState({ safeAreaInsets })
      })
  }

  componentDidMount() {
    // Add event listener
    SafeArea.addEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsForRootViewChange)
  }


  componentWillUnmount() {
    // Remove event listener
    SafeArea.removeEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsForRootViewChange)
  }

  onSafeAreaInsetsForRootViewChange(result: { safeAreaInsets: SafeAreaInsets }) {
    const { safeAreaInsets } = result
    this.setState({ safeAreaInsets })
  }

  render() {
    const { safeAreaInsets } = this.state

    return (
      <View style={styles.container}>
        <View style={[styles.content, {
          marginTop: safeAreaInsets.top,
          marginLeft: safeAreaInsets.left,
          marginBottom: safeAreaInsets.bottom,
          marginRight: safeAreaInsets.right,
        }]}>
          <Text style={styles.label}>
            {'It\'s safe!'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99ff99',
  },
  label: {
    color: '#333333',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
