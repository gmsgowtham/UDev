import { FunctionComponent, memo } from "react";
import { StyleSheet } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type ImageSkeletonProps = {
	aspectRatio: number;
};

const ImageSkeleton: FunctionComponent<ImageSkeletonProps> = ({
	aspectRatio,
}) => {
	const theme = useTheme();

	return (
		<Surface style={[styles.iconContainer, { aspectRatio }]} mode="flat">
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
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		opacity: 0.2,
	},
});

export default memo(ImageSkeleton);
