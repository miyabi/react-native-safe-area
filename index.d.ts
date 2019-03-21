
declare module 'react-native-safe-area' {
    import { ComponentType } from 'react'

    // from `TypeDefinition.js`
    type SafeAreaInsets = { top: number; left: number; bottom: number; right: number };

    type EventType = 'safeAreaInsetsForRootViewDidChange'

    type EventPayload = { safeAreaInsets: SafeAreaInsets }

    // from `SafeArea.[ios|android].js`
    export default class SafeArea {
        static getSafeAreaInsetsForRootView(): Promise<EventPayload>
        static addEventListener(eventType: EventType, listener: (payload: EventPayload) => void): void 
        static removeEventListener(eventType: EventType, listener: (payload: EventPayload) => void): void
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

    export function withSafeArea<P>(
        WrappedComponent: React.ComponentType<P>,
        /**
         * @default 'margin'
         */
        applyTo: 'margin' | 'padding' | 'absolutePosition' | 'contentInset',
        /**
         * @default 'all'
         */
        direction: Direction,
    ): ComponentType<P>;
}
