import { type FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import { useMarkdown } from "react-native-marked";
import { Surface, useTheme } from "react-native-paper";
import { useMarkdownOptions } from "./useMarkdownOptions";

interface MarkdownCardProps {
	value: string;
}

const MarkdownCard: FunctionComponent<MarkdownCardProps> = ({ value }) => {
	const theme = useTheme();
	const options = useMarkdownOptions();
	const elements = useMarkdown(value, options);

	if (elements.length === 0) {
		return null;
	}

	return (
		<Surface
			style={[
				styles.wrapper,
				{
					// White fill with a defined border instead of a gray fill.
					borderColor: theme.dark ? theme.colors.outline : "#E3E3E0",
					backgroundColor: theme.colors.surface,
				},
			]}
			mode="flat"
		>
			<View style={styles.container}>{elements}</View>
		</Surface>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		borderRadius: 4,
		borderWidth: 1,
		marginVertical: 8,
		overflow: "hidden",
	},
	container: {
		padding: 16,
		gap: 8,
	},
});

export default memo(MarkdownCard);
