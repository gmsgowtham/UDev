import { ARTICLE_COVER_IMAGE_ASPECT_RATIO } from "../../utils/const";
import TagList from "../TagList";
import { FunctionComponent, memo } from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Avatar, Card, Text } from "react-native-paper";

interface author {
	imageUri: string;
	name: string;
}

interface ArticleFeedItemProps {
	id: number;
	title: string;
	description: string;
	author: author;
	dateReadable: string;
	onItemClick: (id: number) => void;
	tags?: string[];
	organizationName?: string;
	coverImageUri?: string | null;
}

const ArticleFeedItem: FunctionComponent<ArticleFeedItemProps> = ({
	id,
	title,
	description,
	coverImageUri,
	author,
	dateReadable,
	onItemClick,
	tags,
}) => {
	const onClick = () => {
		onItemClick(id);
	};

	return (
		<Card style={styles.card} onPress={onClick}>
			{coverImageUri ? (
				<FastImage
					source={{ uri: coverImageUri }}
					style={styles.cover}
					resizeMode={FastImage.resizeMode.contain}
				/>
			) : null}
			<Card.Title
				title={author.name}
				subtitle={dateReadable}
				subtitleVariant="bodySmall"
				left={({ size }) => (
					<Avatar.Image size={size} source={{ uri: author.imageUri }} />
				)}
			/>
			<Card.Content>
				<Text variant="titleLarge" style={styles.title}>
					{title}
				</Text>
				<Text variant="bodyMedium">{description}</Text>
				<TagList tags={tags} />
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginVertical: 4,
	},
	cover: {
		width: "100%",
		aspectRatio: ARTICLE_COVER_IMAGE_ASPECT_RATIO,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	content: {
		marginTop: 16,
	},
	title: {
		marginBottom: 8,
	},
	actionsWrapper: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default memo(ArticleFeedItem);
