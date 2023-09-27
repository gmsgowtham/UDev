import { FunctionComponent, memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Avatar, Card, Text } from "react-native-paper";
import { ARTICLE_COVER_IMAGE_ASPECT_RATIO } from "../../utils/const";
import TagList from "../TagList";

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
	organizationName,
}) => {
	const onClick = () => {
		onItemClick(id);
	};

	const authorTitle = useMemo(() => {
		if (organizationName) {
			return `${author.name} for ${organizationName}`;
		}

		return author.name;
	}, [organizationName, author.name]);

	return (
		<Card onPress={onClick}>
			{coverImageUri ? (
				<FastImage
					source={{ uri: coverImageUri }}
					style={styles.cover}
					resizeMode={FastImage.resizeMode.contain}
				/>
			) : null}
			<Card.Content style={styles.content}>
				<Text variant="titleLarge">{title}</Text>
				<TagList tags={tags} />
				{description ? <Text variant="bodyMedium">{description}</Text> : null}
			</Card.Content>
			<Card.Title
				title={authorTitle}
				subtitle={dateReadable}
				subtitleVariant="bodySmall"
				left={({ size }) => (
					<Avatar.Image size={size} source={{ uri: author.imageUri }} />
				)}
			/>
		</Card>
	);
};

const styles = StyleSheet.create({
	cover: {
		width: "100%",
		aspectRatio: ARTICLE_COVER_IMAGE_ASPECT_RATIO,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	content: {
		marginTop: 16,
		gap: 8,
	},
	actionsWrapper: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default memo(ArticleFeedItem);
