import { FunctionComponent, memo } from "react";
import { StyleSheet } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const ImageSkeleton: FunctionComponent = () => {
	const theme = useTheme();

	return (
		<Surface style={styles.iconContainer} mode="flat">
			<Icon
				name="image"
				size={40}
				style={styles.icon}
				color={theme.colors.onSurface}
			/>
		</Surface>
	);
};

const styles = StyleSheet.create({
	iconContainer: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		opacity: 0.2,
	},
});

export default memo(ImageSkeleton);
