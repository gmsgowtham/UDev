import { getAbsURLFromAnchorMarkdown } from "../../utils/markdown";
import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { FunctionComponent, memo } from "react";
import { StyleSheet } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

interface DevEmbedProps {
	url: string;
}

// TODO: handle errors
const DevEmbed: FunctionComponent<DevEmbedProps> = ({ url }) => {
	const theme = useTheme();

	const renderText = (url: string) => {
		return (
			<Text variant="bodySmall" numberOfLines={2}>
				{url}
			</Text>
		);
	};

	const renderTitle = (title: string) => {
		return (
			<Text
				variant="titleMedium"
				style={[styles.title, { color: theme.colors.primary }]}
				numberOfLines={2}
			>
				{title}
			</Text>
		);
	};

	const renderDescription = () => {
		return null;
	};

	const renderImage = () => null;

	return (
		<Surface style={styles.container} mode="flat" elevation={2}>
			<LinkPreview
				text={getAbsURLFromAnchorMarkdown(url)}
				renderImage={renderImage}
				renderText={renderText}
				renderTitle={renderTitle}
				renderDescription={renderDescription}
			/>
		</Surface>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		marginVertical: 8,
		height: 130,
	},
	title: {
		marginBottom: 8,
	},
});

export default memo(DevEmbed);
