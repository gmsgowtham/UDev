import { Image } from "expo-image";
import { type FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, Text, useTheme } from "react-native-paper";
import { RADIUS, SPACING } from "../../theme/spacing";
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
	onItemClick: (id: number) => void;
}

const VideoFeedItem: FunctionComponent<VideoFeedItemProps> = ({
	id,
	title,
	author,
	coverImageUri,
	duration,
	onItemClick,
}) => {
	const theme = useTheme();
	const onClick = () => {
		onItemClick(id);
	};

	return (
		<Card
			mode="contained"
			onPress={onClick}
			style={[
				styles.card,
				{
					backgroundColor: theme.colors.surface,
					borderColor: theme.colors.outline,
				},
			]}
		>
			{coverImageUri ? (
				<View style={styles.coverWrapper}>
					<Image
						source={{ uri: coverImageUri }}
						style={styles.cover}
						contentFit="cover"
					/>
					<Chip
						mode="flat"
						icon="play-arrow"
						style={styles.playChip}
						textStyle={styles.playChipText}
					>
						{duration}
					</Chip>
				</View>
			) : null}
			<Card.Content style={styles.content}>
				<Text
					variant="titleLarge"
					style={[styles.title, { color: theme.colors.onSurface }]}
				>
					{title}
				</Text>
				<Text
					variant="bodySmall"
					style={{ color: theme.colors.onSurfaceVariant }}
				>
					{author.name}
				</Text>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderRadius: RADIUS.small,
		overflow: "hidden",
	},
	coverWrapper: {
		position: "relative",
		flex: 1,
	},
	cover: {
		width: "100%",
		aspectRatio: VIDEO_COVER_IMAGE_ASPECT_RATIO,
		borderTopLeftRadius: RADIUS.small,
		borderTopRightRadius: RADIUS.small,
	},
	content: {
		paddingHorizontal: SPACING.cardPadding,
		paddingTop: SPACING.cardPadding,
		paddingBottom: SPACING.cardPaddingBottom,
		gap: 4,
	},
	title: {
		marginBottom: 4,
	},
	playChip: {
		position: "absolute",
		bottom: 8,
		right: 8,
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		borderRadius: RADIUS.small,
	},
	playChipText: {
		color: "#FFFFFF",
		fontSize: 12,
		fontFamily: "Inter-Medium",
	},
});

export default memo(VideoFeedItem);
