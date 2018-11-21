/// <reference types="react" />

declare module 'react-native-safe-area' {

    // from `TypeDefinition.js`
    type SafeAreaInsets = { top: number; left: number; bottom: number; right: number };

    // from `SafeArea.[ios|android].js`
    export default class SafeArea {
        static getSafeAreaInsetsForRootView(): Promise<{ safeAreaInsets: SafeAreaInsets }> {}
        static addEventListener(eventType: string, listener: (...args: any[]) => any, context?: any) 
        static removeEventListener(eventType: string, listener: (...args: any[]) => any) 
    }

    // from `withSafeArea.js`
    type Direction =
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'topLeft' // DEPRECATED
        | 'topAndLeft'
        | 'topRight' // DEPRECATED
        | 'topAndRight'
        | 'bottomLeft' // DEPRECATED
        | 'bottomAndLeft'
        | 'bottomRight' // DEPRECATED
        | 'bottomAndRight'
        | 'vertical'
        | 'horizontal'
        | 'verticalAndLeft'
        | 'verticalAndRight'
        | 'horizontalAndTop'
        | 'horizontalAndBottom'
        | 'all';

    export function withSafeArea(
        WrappedComponent: React.ComponentType<any>,
        applyTo: 'margin' | 'padding' | 'absolutePosition' | 'contentInset' = 'margin',
        direction: Direction = 'all',
    ): React.ComponentType<any>;
}
