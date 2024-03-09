import { type FunctionComponent, memo, useEffect, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Surface, Text, TouchableRipple, useTheme } from "react-native-paper";
import { fetchContentFromURL } from "../../api";
import { logError } from "../../utils/log";

interface Props {
	url: string;
	type?: string;
}

const LinkPreview: FunctionComponent<Props> = ({ url }) => {
	const theme = useTheme();
	const [title, setTitle] = useState("External URL");

	useEffect(() => {
		const fetchContent = async () => {
			try {
				const resp = await fetchContentFromURL(url);
				const html = resp.data;
				const titleRegex = new RegExp(/<title>(.*?)<\/title>/gim);

				const matches = titleRegex.exec(html);
				if (matches && matches.length > 0) {
					setTitle(matches[1]);
				}
			} catch (e) {
				logError(e as Error, "Error while fetching url for preview");
				console.error(e);
			}
		};

		fetchContent();
	}, [url]);

	const onPress = () => {
		Linking.openURL(url);
	};

	return (
		<Surface style={styles.wrapper} mode="flat">
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
		borderRadius: 16,
		minHeight: 60,
		marginVertical: 8,
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
