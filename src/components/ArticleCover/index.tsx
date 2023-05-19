import { FunctionComponent, memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface ArticleCoverProps {
	cover: {
		uri?: string;
		aspectRatio?: number;
	};
	title: string;
}

const ArticleCover: FunctionComponent<ArticleCoverProps> = ({
	cover,
	title,
}) => {
	return (
		<View style={styles.wrapper}>
			{cover.uri && cover.aspectRatio ? (
				<Image
					source={{ uri: cover.uri }}
					style={[styles.image, { aspectRatio: cover.aspectRatio }]}
				/>
			) : null}
			<Text variant="headlineMedium">{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		gap: 16,
		marginBottom: 16,
	},
	image: {
		width: "100%",
	},
});

export default memo(ArticleCover);
