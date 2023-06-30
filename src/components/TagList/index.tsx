import { FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface TagListProps {
	tags?: string[];
}

const TagList: FunctionComponent<TagListProps> = ({ tags = [] }) => {
	if (tags.length < 1) {
		return null;
	}

	return (
		<View style={styles.tags}>
			{tags.map((t) => (
				<Text variant="labelMedium" key={t} style={styles.text}>
					#{t}
				</Text>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	tags: {
		flexDirection: "row",
		gap: 8,
		marginTop: 8,
		flexWrap: "wrap",
	},
	text: {
		fontStyle: "italic",
	},
});

export default memo(TagList);
