import { type FunctionComponent, memo } from "react";
import { StyleSheet } from "react-native";
import { Icon, Surface, useTheme } from "react-native-paper";

const ImageSkeleton: FunctionComponent = () => {
	const theme = useTheme();

	return (
		<Surface style={styles.iconContainer} mode="flat">
			<Icon source="image" size={40} color={theme.colors.onSurface} />
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
});

export default memo(ImageSkeleton);
