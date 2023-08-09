import { ARTICLE_COVER_IMAGE_ASPECT_RATIO } from "../../utils/const";
import TagList from "../TagList";
import { FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Avatar, Text } from "react-native-paper";

interface ArticleCoverProps {
	id: number;
	cover: {
		uri?: string | null;
	};
	title: string;
	author: {
		imageUri: string;
		name: string;
	};
	dateReadable: string;
	tags?: string[];
}

const ArticleCover: FunctionComponent<ArticleCoverProps> = ({
	cover,
	title,
	author,
	dateReadable,
	tags = [],
}) => {
	return (
		<>
			{cover.uri ? (
				<FastImage source={{ uri: cover.uri }} style={styles.image} />
			) : null}
			<View style={styles.wrapper}>
				<View style={styles.authorContainer}>
					<Avatar.Image size={50} source={{ uri: author.imageUri }} />
					<View style={styles.authorInfo}>
						<Text variant="titleMedium">{author.name}</Text>
						<Text variant="labelMedium">{dateReadable}</Text>
					</View>
				</View>
				<Text variant="headlineMedium">{title}</Text>
				<TagList tags={tags} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 12,
		marginVertical: 16,
	},
	image: {
		width: "100%",
		aspectRatio: ARTICLE_COVER_IMAGE_ASPECT_RATIO,
	},
	authorContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
		marginBottom: 16,
	},
	authorInfo: {
		gap: 4,
		justifyContent: "space-between",
	},
});

export default memo(ArticleCover);
