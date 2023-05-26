import { FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, useTheme, Text, Badge, Avatar } from "react-native-paper";
import { LinkPreview } from "@flyerhq/react-native-link-preview";

interface DevEmbedProps {
	url: string;
}

// TODO: handle errors
const DevEmbed: FunctionComponent<DevEmbedProps> = ({ url }) => {
	const theme = useTheme();

	const renderText = () => {
		return <Avatar.Icon size={24} icon="link" />;
	};

	const renderTitle = (title: string) => {
		return (
			<Text
				variant="headlineMedium"
				style={[styles.title, { color: theme.colors.primary }]}
			>
				{title}
			</Text>
		);
	};

	const renderDescription = (desc: string) => {
		return <Text variant="bodyMedium">{desc}</Text>;
	};

	const renderImage = () => null;

	return (
		<Surface style={styles.container} mode="flat" elevation={2}>
			<LinkPreview
				text={url}
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
	},
	title: {
		marginBottom: 8,
	},
});

export default memo(DevEmbed);
