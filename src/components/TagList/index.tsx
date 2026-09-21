import { type FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface TagListProps {
	tags?: string[];
}

const TagList: FunctionComponent<TagListProps> = ({ tags = [] }) => {
	const theme = useTheme();
	if (tags.length < 1) {
		return null;
	}

	return (
		<View style={styles.tags}>
			{tags.map((t) => (
				<Text
					variant="bodyMedium"
					key={t}
					style={[styles.text, { color: theme.colors.onSurfaceVariant }]}
				>
					<Text
						variant="bodyMedium"
						style={{ color: theme.colors.onSurfaceVariant, opacity: 0.6 }}
					>
						#
					</Text>
					{t}
				</Text>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	tags: {
		flexDirection: "row",
		gap: 8,
		flexWrap: "wrap",
	},
	text: {},
});

export default memo(TagList);
