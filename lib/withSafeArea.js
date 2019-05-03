// @flow

import * as React from 'react'
import { StyleSheet } from 'react-native'
import SafeArea from './SafeArea'
import { type SafeAreaInsets } from './TypeDefinition'

type Direction =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'     // DEPRECATED
  | 'topAndLeft'
  | 'topRight'    // DEPRECATED
  | 'topAndRight'
  | 'bottomLeft'  // DEPRECATED
  | 'bottomAndLeft'
  | 'bottomRight' // DEPRECATED
  | 'bottomAndRight'
  | 'vertical'
  | 'horizontal'
  | 'verticalAndLeft'
  | 'verticalAndRight'
  | 'horizontalAndTop'
  | 'horizontalAndBottom'
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
  let _direction = direction

  const match = _direction.match(/^(top|bottom)(Left|Right)$/)
  if (match) {
    _direction = `${match[1]}And${match[2]}`

    // eslint-disable-next-line
    console.warn(`'${direction}' is deprecated. Use '${_direction}' instead.`)
  }

  const applysToTop = (
    _direction === 'top' ||
    _direction === 'topAndLeft' ||
    _direction === 'topAndRight' ||
    _direction === 'vertical' ||
    _direction === 'verticalAndLeft' ||
    _direction === 'verticalAndRight' ||
    _direction === 'horizontalAndTop' ||
    _direction === 'all'
  )
  const applysToBottom = (
    _direction === 'bottom' ||
    _direction === 'bottomAndLeft' ||
    _direction === 'bottomAndRight' ||
    _direction === 'vertical' ||
    _direction === 'verticalAndLeft' ||
    _direction === 'verticalAndRight' ||
    _direction === 'horizontalAndBottom' ||
    _direction === 'all'
  )
  const applysToLeft = (
    _direction === 'left' ||
    _direction === 'topAndLeft' ||
    _direction === 'bottomAndLeft' ||
    _direction === 'horizontal' ||
    _direction === 'horizontalAndTop' ||
    _direction === 'horizontalAndBottom' ||
    _direction === 'verticalAndLeft' ||
    _direction === 'all'
  )
  const applysToRight = (
    _direction === 'right' ||
    _direction === 'topAndRight' ||
    _direction === 'bottomAndRight' ||
    _direction === 'horizontal' ||
    _direction === 'horizontalAndTop' ||
    _direction === 'horizontalAndBottom' ||
    _direction === 'verticalAndRight' ||
    _direction === 'all'
  )

  return class extends React.Component<Props, State> {
    state = { safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 } }
    wrappedRef: any = null
    onSafeAreaInsetsDidChange = this.onSafeAreaInsetsDidChange.bind(this)

    UNSAFE_componentWillMount(): void {
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
        const contentInset = this.props.contentInset
        const contentOffset = this.props.contentOffset
        const injected = {
          automaticallyAdjustContentInsets: false,
          contentInset: { ...contentInset },
          contentOffset: { ...contentOffset },
        }

        if (applysToTop || applysToBottom) {
          if (applysToTop) {
            injected.contentInset.top = (
              contentInset && contentInset.top
                ? contentInset.top
                : 0
            ) + top

            if (this.wrappedRef && this.wrappedRef.getScrollResponder) {
              const scrollView = this.wrappedRef.getScrollResponder()
              if (scrollView && scrollView._scrollAnimatedValue) {
                scrollView._scrollAnimatedValue.setOffset(injected.contentInset.top)
              }
            }

            injected.contentOffset.y = (
              contentOffset && contentOffset.y
                ? contentOffset.y
                : 0
            ) - top
          }

          if (applysToBottom) {
            injected.contentInset.bottom = (
              contentInset && contentInset.bottom
                ? contentInset.bottom
                : 0
            ) + bottom
          }
        }

        if (applysToLeft || applysToRight) {
          if (applysToLeft) {
            injected.contentInset.left = (
              contentInset && contentInset.left
                ? contentInset.left
                : 0
            ) + left
          }

          if (applysToRight) {
            injected.contentInset.right = (
              contentInset && contentInset.right
                ? contentInset.right
                : 0
            ) + right
          }

          injected.contentOffset.x = (
            contentOffset && contentOffset.x
              ? contentOffset.x
              : 0
          ) - left
        }

        return injected
      }

      const style = StyleSheet.flatten([this.props.style]) || {}
      const injected = { style: { ...{}, ...style } }

      if (applyTo === 'margin') {
        if (applysToTop) {
          const marginTop = style.marginTop || style.marginVertical || style.margin || 0
          injected.style.marginTop = parseInt(marginTop, 10) + top
        }
        if (applysToBottom) {
          const marginBottom = style.marginBottom || style.marginVertical || style.margin || 0
          injected.style.marginBottom = parseInt(marginBottom, 10) + bottom
        }
        if (applysToLeft) {
          const marginLeft = style.marginLeft || style.marginHorizontal || style.margin || 0
          injected.style.marginLeft = parseInt(marginLeft, 10) + left
        }
        if (applysToRight) {
          const marginRight = style.marginRight || style.marginHorizontal || style.margin || 0
          injected.style.marginRight = parseInt(marginRight, 10) + right
        }
      } else if (applyTo === 'padding') {
        if (applysToTop) {
          const paddingTop = style.paddingTop || style.paddingVertical || style.padding || 0
          injected.style.paddingTop = parseInt(paddingTop, 10) + top
        }
        if (applysToBottom) {
          const paddingBottom = style.paddingBottom || style.paddingVertical || style.padding || 0
          injected.style.paddingBottom = parseInt(paddingBottom, 10) + bottom
        }
        if (applysToLeft) {
          const paddingLeft = style.paddingLeft || style.paddingHorizontal || style.padding || 0
          injected.style.paddingLeft = parseInt(paddingLeft, 10) + left
        }
        if (applysToRight) {
          const paddingRight = style.paddingRight || style.paddingHorizontal || style.padding || 0
          injected.style.paddingRight = parseInt(paddingRight, 10) + right
        }
      } else if (applyTo === 'absolutePosition') {
        if (applysToTop && style.top !== undefined) {
          injected.style.top = parseInt(style.top, 10) + top
        }
        if (applysToBottom && style.bottom !== undefined) {
          injected.style.bottom = parseInt(style.bottom, 10) + bottom
        }
        if (applysToLeft && style.left !== undefined) {
          injected.style.left = parseInt(style.left, 10) + left
        }
        if (applysToRight && style.right !== undefined) {
          injected.style.right = parseInt(style.right, 10) + right
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
