import { Image } from "expo-image";
import { type FunctionComponent, memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text, useTheme } from "react-native-paper";
import { AVATAR_SIZE, RADIUS } from "../../theme/spacing";
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
	reactionsCount?: number;
	commentsCount?: number;
	readingTimeMinutes?: number;
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
	reactionsCount = 0,
	commentsCount = 0,
	readingTimeMinutes,
}) => {
	const theme = useTheme();
	const onClick = () => {
		onItemClick(id);
	};

	const authorTitle = useMemo(() => {
		if (organizationName) {
			return `${author.name} for ${organizationName}`;
		}

		return author.name;
	}, [organizationName, author.name]);

	const metaLeft = useMemo(() => {
		const parts: string[] = [];
		if (reactionsCount > 0) {
			parts.push(
				`${reactionsCount} reaction${reactionsCount === 1 ? "" : "s"}`,
			);
		}
		if (commentsCount > 0) {
			parts.push(`${commentsCount} comment${commentsCount === 1 ? "" : "s"}`);
		}
		if (parts.length < 1) {
			return null;
		}
		return parts.join("  •  ");
	}, [reactionsCount, commentsCount]);

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
				<Image
					source={{ uri: coverImageUri }}
					style={styles.cover}
					contentFit="cover"
				/>
			) : null}
			<Card.Content style={styles.content}>
				<View style={styles.authorRow}>
					<Avatar.Image size={AVATAR_SIZE} source={{ uri: author.imageUri }} />
					<View style={styles.authorInfo}>
						<Text
							variant="titleSmall"
							numberOfLines={1}
							style={{ color: theme.colors.onSurface }}
						>
							{authorTitle}
						</Text>
						<Text
							variant="bodySmall"
							style={{ color: theme.colors.onSurfaceVariant }}
						>
							{dateReadable}
						</Text>
					</View>
				</View>
				<Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
					{title}
				</Text>
				<TagList tags={tags} />
				{description ? (
					<Text
						variant="bodyMedium"
						numberOfLines={2}
						style={{ color: theme.colors.onSurfaceVariant }}
					>
						{description}
					</Text>
				) : null}
				<View style={styles.metaRow}>
					{metaLeft ? (
						<Text
							variant="bodySmall"
							style={{ color: theme.colors.onSurfaceVariant }}
						>
							{metaLeft}
						</Text>
					) : (
						<View />
					)}
					{readingTimeMinutes ? (
						<Text
							variant="bodySmall"
							style={{ color: theme.colors.onSurfaceVariant }}
						>
							{readingTimeMinutes} min read
						</Text>
					) : null}
				</View>
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
	cover: {
		width: "100%",
		aspectRatio: ARTICLE_COVER_IMAGE_ASPECT_RATIO,
		borderTopLeftRadius: RADIUS.small,
		borderTopRightRadius: RADIUS.small,
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 12,
		gap: 8,
	},
	authorRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 4,
	},
	authorInfo: {
		flex: 1,
		gap: 0,
		justifyContent: "center",
	},
	metaRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 4,
	},
});

export default memo(ArticleFeedItem);
