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
}) => {
	const onClick = () => {
		onItemClick(id, title);
	};

	const theme = useTheme();

	return (
		<Card
			style={{ marginVertical: 12, paddingBottom: 4 }}
			mode="contained"
			onPress={onClick}
		>
			{coverImageUri && (
				<Card.Cover
					source={{ uri: coverImageUri }}
					style={{
						height: 212,
						borderWidth: StyleSheet.hairlineWidth,
						borderColor: theme.colors.elevation.level5,
					}}
				/>
			)}
			<Card.Content style={{ marginVertical: 8 }}>
				<Text variant="titleLarge" style={{ marginBottom: 8 }}>
					{title}
				</Text>
				<Text variant="bodyMedium">{description}</Text>
			</Card.Content>
			<Card.Actions style={{ flexDirection: "row-reverse" }}>
				<View
					style={{
						flexDirection: "row",
						gap: 8,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Avatar.Image size={42} source={{ uri: author.imageUri }} />
					<View>
						<Text variant="titleMedium">{author.name}</Text>
						<Text variant="bodySmall">{dateReadable}</Text>
					</View>
				</View>
			</Card.Actions>
		</Card>
	);
};

export default memo(ArticleFeedItem);
