import { memo, FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme, Chip } from "react-native-paper";

interface author {
	name: string;
}

interface VideoFeedItemProps {
	id: number;
	title: string;
	author: author;
	duration: string;
	coverImageUri: string;
	onItemClick: (id: number, title: string) => void;
}

const VideoFeedItem: FunctionComponent<VideoFeedItemProps> = ({
	id,
	title,
	author,
	coverImageUri,
	duration,
	onItemClick,
}) => {
	const onClick = () => {
		onItemClick(id, title);
	};

	const theme = useTheme();

	return (
		<Card style={styles.card} mode="contained" onPress={onClick}>
			{coverImageUri && (
				<View style={styles.coverWrapper}>
					<Card.Cover
						source={{ uri: coverImageUri }}
						style={[
							styles.cover,
							{ borderColor: theme.colors.elevation.level5 },
						]}
					/>
					<Chip elevated icon="clock" style={styles.playChip}>
						{duration}
					</Chip>
				</View>
			)}
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
		marginVertical: 12,
	},
	coverWrapper: {
		position: "relative",
	},
	cover: {
		height: 212,
		borderWidth: StyleSheet.hairlineWidth,
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
