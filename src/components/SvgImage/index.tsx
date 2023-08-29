import { FunctionComponent, memo, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import SVGImage from "react-native-remote-svg";

type SvgImageProps = {
	uri: string;
	label?: string;
};

const DEFAULT_ASPECT_RATIO = 1; // 1:1 aspect ratio

const SvgImage: FunctionComponent<SvgImageProps> = ({
	uri,
	label = "image",
}) => {
	return (
		<Surface style={styles.container}>
			<SVGImage
				source={{ uri: uri }}
				style={[styles.svg]}
				accessibilityLabel={label}
				aria-label={label}
			/>
		</Surface>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		aspectRatio: DEFAULT_ASPECT_RATIO,
	},
	svg: {
		width: "100%",
		height: "100%",
		alignSelf: "center",
	},
});

export default memo(SvgImage);
