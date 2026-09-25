import { Image } from "expo-image";
import { type FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, Icon, Text, useTheme } from "react-native-paper";
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
	thumbnailUri?: string | null;
	onItemClick: (id: number) => void;
}

const VideoFeedItem: FunctionComponent<VideoFeedItemProps> = ({
	id,
	title,
	author,
	thumbnailUri,
	duration,
	onItemClick,
}) => {
	const theme = useTheme();
	const onClick = () => {
		onItemClick(id);
	};

	// The videos API reports "00:00" for every item, so only show
	// the duration badge when a real value is present.
	const showDuration = !!duration && duration !== "00:00";

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
			{thumbnailUri ? (
				<View style={styles.coverWrapper}>
					<Image
						source={{ uri: thumbnailUri }}
						style={styles.cover}
						contentFit="cover"
					/>
					<View style={styles.playOverlay} pointerEvents="none">
						<View style={styles.playCircle}>
							<Icon source="play-arrow" size={40} color="#FFFFFF" />
						</View>
					</View>
					{showDuration ? (
						<Chip
							mode="flat"
							style={styles.durationChip}
							textStyle={styles.durationChipText}
						>
							{duration}
						</Chip>
					) : null}
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
	playOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	playCircle: {
		width: 72,
		height: 72,
		borderRadius: 36,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		justifyContent: "center",
		alignItems: "center",
	},
	durationChip: {
		position: "absolute",
		bottom: 8,
		right: 8,
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		borderRadius: RADIUS.small,
	},
	durationChipText: {
		color: "#FFFFFF",
		fontSize: 12,
		fontFamily: "Inter-Medium",
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
});

export default memo(VideoFeedItem);
