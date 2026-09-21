import { type FunctionComponent, memo } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Surface, Text, TouchableRipple, useTheme } from "react-native-paper";
import { useLinkPreviewTitle } from "../../api/hooks";

interface Props {
	url: string;
	type?: string;
}

const LinkPreview: FunctionComponent<Props> = ({ url }) => {
	const theme = useTheme();
	const { data } = useLinkPreviewTitle(url);
	const title = data ?? "External URL";

	const onPress = () => {
		Linking.openURL(url);
	};

	return (
		<Surface
			style={[
				styles.wrapper,
				{
					// White fill with a defined border instead of a gray fill.
					backgroundColor: theme.colors.surface,
					borderColor: theme.dark ? theme.colors.outline : "#E3E3E0",
				},
			]}
			mode="flat"
		>
			<TouchableRipple style={styles.touchable} onPress={onPress}>
				<View style={styles.container}>
					<Text variant="labelSmall" numberOfLines={1}>
						{url}
					</Text>
					<Text
						variant="titleMedium"
						numberOfLines={3}
						style={{ color: theme.colors.primary }}
					>
						{title}
					</Text>
				</View>
			</TouchableRipple>
		</Surface>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		borderRadius: 4,
		borderWidth: 1,
		minHeight: 60,
		marginVertical: 8,
		overflow: "hidden",
	},
	touchable: {
		flex: 1,
	},
	container: {
		padding: 16,
		gap: 8,
	},
});

export default memo(LinkPreview);
