import React from "react";
import Animated, { AnimateProps } from "react-native-reanimated";

// React Naive Reanimated `createAnimatedComponent` does not accept functional components
// This is to support passing functional compoenent to `createAnimatedComponent`
// Refer: https://github.com/callstack/react-native-paper/issues/2364
export function withAnimated<T extends object>(
	WrappedComponent: React.ComponentType<T>,
): React.ComponentClass<AnimateProps<T>, unknown> {
	const displayName =
		WrappedComponent.displayName || WrappedComponent.name || "Component";

	class WithAnimated extends React.Component<T, unknown> {
		static displayName = `WithAnimated(${displayName})`;

		render(): React.ReactNode {
			return <WrappedComponent {...this.props} />;
		}
	}
	return Animated.createAnimatedComponent(WithAnimated);
}
