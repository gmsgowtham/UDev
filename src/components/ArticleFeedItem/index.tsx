import { memo, FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Avatar, useTheme } from "react-native-paper";

export interface author {
	imageUri: string;
	name: string;
}

interface ArticleFeedItemProps {
	id: number;
	title: string;
	description: string;
	author: author;
	dateReadable: string;
	onItemClick: (id: number, title: string) => void;
	tags?: string[];
	organizationName?: string;
	coverImageUri?: string | null;
}

const Tags = memo<Record<"tags", string[] | undefined>>(({ tags = [] }) => {
	if (tags.length < 1) {
		return null;
	}

	return (
		<View style={styles.tags}>
			{tags.map((t, index) => (
				<Text key={`${t}${index}`}>#{t}</Text>
			))}
		</View>
	);
});

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
		onItemClick(id, title);
	};

	const theme = useTheme();

	return (
		<Card style={styles.card} mode="contained" onPress={onClick}>
			{coverImageUri && (
				<Card.Cover
					source={{ uri: coverImageUri }}
					style={[styles.cover, { borderColor: theme.colors.elevation.level5 }]}
				/>
			)}
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
				<Tags tags={tags} />
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginVertical: 12,
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
	tags: {
		flexDirection: "row",
		gap: 8,
		marginTop: 8,
	},
	actionsWrapper: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default memo(ArticleFeedItem);
