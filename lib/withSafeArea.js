// @flow

import * as React from 'react'
import { StyleSheet } from 'react-native'
import SafeArea, { type SafeAreaInsets } from 'react-native-safe-area'

type Direction =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'vertical'
  | 'horizontal'
  | 'all'
;

type Props = any;
type State = {
  safeAreaInsets: SafeAreaInsets,
};

export function withSafeArea(
  WrappedComponent: React.ComponentType<any>,
  applyTo: 'margin' | 'padding' | 'absolutePosition' | 'contentInset' = 'margin',
  direction: Direction = 'all'
): React.ComponentType<any> {
  const applysToTop = (
    direction === 'top' ||
    direction === 'topLeft' ||
    direction === 'topRight' ||
    direction === 'vertical' ||
    direction === 'all'
  )
  const applysToBottom = (
    direction === 'bottom' ||
    direction === 'bottomLeft' ||
    direction === 'bottomRight' ||
    direction === 'vertical' ||
    direction === 'all'
  )
  const applysToLeft = (
    direction === 'left' ||
    direction === 'topLeft' ||
    direction === 'bottomLeft' ||
    direction === 'horizontal' ||
    direction === 'all'
  )
  const applysToRight = (
    direction === 'right' ||
    direction === 'topRight' ||
    direction === 'bottomRight' ||
    direction === 'horizontal' ||
    direction === 'all'
  )

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
      const isVerticalInverted = this.props.inverted && !this.props.horizontal
      const isHorizontalInverted = this.props.inverted && this.props.horizontal

      const { safeAreaInsets } = this.state
      const top = !isVerticalInverted ? safeAreaInsets.top : safeAreaInsets.bottom
      const bottom = !isVerticalInverted ? safeAreaInsets.bottom : safeAreaInsets.top
      const left = !isHorizontalInverted ? safeAreaInsets.left : safeAreaInsets.right
      const right = !isHorizontalInverted ? safeAreaInsets.right : safeAreaInsets.left

      if (applyTo === 'contentInset') {
        const contentInset = this.props.contentInset || {}
        const contentOffset = this.props.contentOffset || {}
        const injected = {
          automaticallyAdjustContentInsets: false,
          contentInset: { ...contentInset },
          contentOffset: { ...contentOffset },
        }

        if (applysToTop || applysToBottom) {
          if (applysToTop) {
            injected.contentInset.top = (contentInset.top || 0) + top
            if (this.wrappedRef && this.wrappedRef.getScrollResponder) {
              const scrollView = this.wrappedRef.getScrollResponder()
              if (scrollView && scrollView._scrollAnimatedValue) {
                scrollView._scrollAnimatedValue.setOffset(injected.contentInset.top);
              }
            }
          }
          if (applysToBottom) {
            injected.contentInset.bottom = (contentInset.bottom || 0) + bottom
          }
          injected.contentOffset.y = (contentOffset.y || 0) - top
        }
        if (applysToLeft || applysToRight) {
          if (applysToLeft) {
            injected.contentInset.left = (contentInset.left || 0) + left
          }
          if (applysToRight) {
            injected.contentInset.right = (contentInset.right || 0) + right
          }
          injected.contentOffset.x = (contentOffset.x || 0) - left
        }

        return injected
      }

      const style = StyleSheet.flatten([this.props.style]) || {}
      const injected = { style: { ...style } }

      if (applyTo === 'margin') {
        if (applysToTop) {
          const marginTop = style.marginTop || style.marginVertical || style.margin || 0
          injected.style.marginTop = marginTop + top
        }
        if (applysToBottom) {
          const marginBottom = style.marginBottom || style.marginVertical || style.margin || 0
          injected.style.marginBottom = marginBottom + bottom
        }
        if (applysToLeft) {
          const marginLeft = style.marginLeft || style.marginHorizontal || style.margin || 0
          injected.style.marginLeft = marginLeft + left
        }
        if (applysToRight) {
          const marginRight = style.marginRight || style.marginHorizontal || style.margin || 0
          injected.style.marginRight = marginRight + right
        }
      } else if (applyTo === 'padding') {
        if (applysToTop) {
          const paddingTop = style.paddingTop || style.paddingVertical || style.padding || 0
          injected.style.paddingTop = paddingTop + top
        }
        if (applysToBottom) {
          const paddingBottom = style.paddingBottom || style.paddingVertical || style.padding || 0
          injected.style.paddingBottom = paddingBottom + bottom
        }
        if (applysToLeft) {
          const paddingLeft = style.paddingLeft || style.paddingHorizontal || style.padding || 0
          injected.style.paddingLeft = paddingLeft + left
        }
        if (applysToRight) {
          const paddingRight = style.paddingRight || style.paddingHorizontal || style.padding || 0
          injected.style.paddingRight = paddingRight + right
        }
      } else if (applyTo === 'absolutePosition') {
        if (applysToTop) {
          injected.style.top = style.top + top
        }
        if (applysToBottom) {
          injected.style.bottom = style.bottom + bottom
        }
        if (applysToLeft) {
          injected.style.left = style.left + left
        }
        if (applysToRight) {
          injected.style.right = style.right + right
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
