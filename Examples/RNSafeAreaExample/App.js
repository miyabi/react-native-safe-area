/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { withSafeArea } from 'react-native-safe-area'

const SafeAreaView = withSafeArea(View, 'margin', 'all')

type Props = {};
type State = {};

export default class App extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.content}>
          <Text style={styles.label}>
            {'It\'s safe!'}
          </Text>
        </SafeAreaView>
      </View>
    )
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
})
