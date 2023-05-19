import { FunctionComponent, memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, Avatar } from "react-native-paper";

interface ArticleCoverProps {
	cover: {
		uri?: string;
		aspectRatio?: number;
	};
	title: string;
	author: {
		imageUri: string;
		name: string;
	};
	dateReadable: string;
}

const ArticleCover: FunctionComponent<ArticleCoverProps> = ({
	cover,
	title,
	author,
	dateReadable,
}) => {
	return (
		<View style={styles.wrapper}>
			{cover.uri && cover.aspectRatio ? (
				<Image
					source={{ uri: cover.uri }}
					style={[styles.image, { aspectRatio: cover.aspectRatio }]}
				/>
			) : null}
			<View style={styles.authorContainer}>
				<Avatar.Image size={50} source={{ uri: author.imageUri }} />
				<View style={styles.authorInfo}>
					<Text variant="titleMedium">{author.name}</Text>
					<Text variant="labelMedium">{dateReadable}</Text>
				</View>
			</View>
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
	authorContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	authorInfo: {
		gap: 4,
		justifyContent: "space-between",
	},
});

export default memo(ArticleCover);
