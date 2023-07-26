import { MotiView } from "moti";
import { FunctionComponent, PropsWithChildren, memo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

interface OverlayProps {
	shouldHide: boolean;
	styles?: StyleProp<ViewStyle>;
}

const Overlay: FunctionComponent<PropsWithChildren<OverlayProps>> = ({
	children,
	shouldHide,
	styles: _styles,
}) => {
	return (
		<MotiView
			style={[styles.absoluteFill, _styles]}
			animate={{ opacity: shouldHide ? 0 : 1 }}
		>
			{children}
		</MotiView>
	);
};

const styles = StyleSheet.create({
	absoluteFill: {
		flex: 1,
		position: "absolute",
		width: "100%",
		height: "100%",
	},
});

export default memo(Overlay);
