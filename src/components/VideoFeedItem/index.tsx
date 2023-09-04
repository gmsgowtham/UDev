import { FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Card, Chip, Text } from "react-native-paper";
import { VIDEO_COVER_IMAGE_ASPECT_RATIO } from "../../utils/const";

interface author {
	name: string;
}

interface VideoFeedItemProps {
	id: number;
	title: string;
	author: author;
	duration: string;
	coverImageUri: string;
	url: string;
	source: string;
	onItemClick: (
		id: number,
		title: string,
		url: string,
		source: string,
		cover: string,
	) => void;
}

const VideoFeedItem: FunctionComponent<VideoFeedItemProps> = ({
	id,
	title,
	author,
	coverImageUri,
	duration,
	url,
	source,
	onItemClick,
}) => {
	const onClick = () => {
		onItemClick(id, title, url, source, coverImageUri);
	};

	return (
		<Card style={styles.card} onPress={onClick}>
			{coverImageUri ? (
				<View style={styles.coverWrapper}>
					<FastImage
						source={{ uri: coverImageUri }}
						style={styles.cover}
						resizeMode={FastImage.resizeMode.cover}
					/>
					<Chip elevated icon="access-time-filled" style={styles.playChip}>
						{duration}
					</Chip>
				</View>
			) : null}
			<Card.Content style={styles.content}>
				<Text variant="titleLarge" style={styles.title}>
					{title}
				</Text>
			</Card.Content>
			<Card.Title title={author.name} subtitleVariant="bodySmall" />
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginVertical: 4,
		flex: 1,
	},
	coverWrapper: {
		position: "relative",
		flex: 1,
	},
	cover: {
		width: "100%",
		aspectRatio: VIDEO_COVER_IMAGE_ASPECT_RATIO,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	content: {
		marginTop: 16,
	},
	title: {
		marginBottom: 8,
	},
	playChip: {
		position: "absolute",
		bottom: 12,
		right: 12,
	},
});

export default memo(VideoFeedItem);
