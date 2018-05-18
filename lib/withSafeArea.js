// @flow

import * as React from 'react'
import { StyleSheet } from 'react-native'
import SafeArea, { type SafeAreaInsets } from 'react-native-safe-area'

type Props = any;
type State = {
  safeAreaInsets: SafeAreaInsets,
};

export function withSafeArea(
  WrappedComponent: React.ComponentType<any>,
  applyTo: 'margin' | 'padding' | 'absolutePosition' | 'contentInset' = 'margin',
  direction: 'horizontal' | 'vertical' | 'both' = 'both'
): React.ComponentType<any> {
  const isHorizontal = direction === 'horizontal' || direction === 'both'
  const isVertical = direction === 'vertical' || direction === 'both'
  return class extends React.Component<Props, State> {
    state = { safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 } }
    wrappedRef: any = null
    onSafeAreaInsetsDidChange = this.onSafeAreaInsetsDidChange.bind(this)

    componentWillMount(): void {
      SafeArea.getSafeAreaInsetsForRootView()
        .then(result => this.onSafeAreaInsetsDidChange(result))
    }

    componentDidMount(): void {
      SafeArea.addEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsDidChange)
    }

    componentWillUnmount(): void {
      SafeArea.removeEventListener(
        'safeAreaInsetsForRootViewDidChange',
        this.onSafeAreaInsetsDidChange
      )
    }

    get currentSafeAreaInsets(): SafeAreaInsets {
      return this.state.safeAreaInsets
    }

    get _injectedProps(): Props {
      const { top, bottom, left, right } = this.state.safeAreaInsets

      if (applyTo === 'contentInset') {
        const contentInset = this.props.contentInset || {}
        const contentOffset = this.props.contentOffset || {}
        const injected = {
          automaticallyAdjustContentInsets: false,
          contentInset: { ...contentInset },
          contentOffset: { ...contentOffset },
        }

        if (isHorizontal) {
          injected.contentInset.left = (contentInset.left || 0) + left
          injected.contentInset.right = (contentInset.right || 0) + right
          injected.contentOffset.x = (contentOffset.x || 0) - left
        }
        if (isVertical) {
          injected.contentInset.top = (contentInset.top || 0) + top
          injected.contentInset.bottom = (contentInset.bottom || 0) + bottom
          injected.contentOffset.y = (contentOffset.y || 0) - top
        }

        return injected
      }

      const style = StyleSheet.flatten([this.props.style]) || {}
      const injected = { style: { ...style } }

      if (applyTo === 'margin') {
        const marginLeft = style.marginLeft || style.marginHorizontal || style.margin
        const marginRight = style.marginRight || style.marginHorizontal || style.margin
        const marginTop = style.marginTop || style.marginVertical || style.margin
        const marginBottom = style.marginBottom || style.marginVertical || style.margin

        if (isHorizontal) {
          injected.style.marginLeft = (marginLeft || 0) + left
          injected.style.marginRight = (marginRight || 0) + right
        }
        if (isVertical) {
          injected.style.marginTop = (marginTop || 0) + top
          injected.style.marginBottom = (marginBottom || 0) + bottom
        }
      } else if (applyTo === 'padding') {
        const paddingLeft = style.paddingLeft || style.paddingHorizontal || style.padding
        const paddingRight = style.paddingRight || style.paddingHorizontal || style.padding
        const paddingTop = style.paddingTop || style.paddingVertical || style.padding
        const paddingBottom = style.paddingBottom || style.paddingVertical || style.padding

        if (isHorizontal) {
          injected.style.paddingLeft = (paddingLeft || 0) + left
          injected.style.paddingRight = (paddingRight || 0) + right
        }
        if (isVertical) {
          injected.style.paddingTop = (paddingTop || 0) + top
          injected.style.paddingBottom = (paddingBottom || 0) + bottom
        }
      } else if (applyTo === 'absolutePosition') {
        if (isHorizontal) {
          if (style.left !== undefined) {
            injected.style.left = style.left + left
          }
          if (style.right !== undefined) {
            injected.style.right = style.right + right
          }
        }
        if (isVertical) {
          if (style.top !== undefined) {
            injected.style.top = style.top + top
          }
          if (style.bottom !== undefined) {
            injected.style.bottom = style.bottom + bottom
          }
        }
      }

      return injected
    }

    onSafeAreaInsetsDidChange(result: { safeAreaInsets: SafeAreaInsets }): void {
      const { safeAreaInsets } = result
      this.setState({ safeAreaInsets })
    }

    render(): React.Node {
      return (
        <WrappedComponent
          ref={(ref) => { this.wrappedRef = ref }}
          {...this.props}
          {...this._injectedProps}
        />
      )
    }
  }
}
