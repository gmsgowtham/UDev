import { FunctionComponent } from "react";
import { Linking, Share, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import Video from "react-native-video";
import { StackParamList } from "../../router/types";
import { logError } from "../../utils/log";

type Props = NativeStackScreenProps<StackParamList, "Video">;

const ArticleScreen: FunctionComponent<Props> = ({ route, navigation }) => {
	const { params } = route;
	const { source, title, url, cover } = params;

	const onBackActionPress = () => {
		navigation.goBack();
	};

	const onShareActionPress = async () => {
		try {
			await Share.share({
				message: url,
				url: url,
				title: title,
			});
		} catch (e) {
			logError(e as Error, "fn: onShareActionPress exception");
		}
	};

	const onOpenInBrowserActionPress = async () => {
		await Linking.openURL(url);
	};

	return (
		<View style={styles.container}>
			<Appbar.Header elevated>
				<Appbar.BackAction onPress={onBackActionPress} />
				<Appbar.Content title={title} />
				<Appbar.Action
					icon="earth"
					onPress={onOpenInBrowserActionPress}
					accessibilityHint="Open in browser"
					accessibilityLabel="Open in browser"
				/>
				<Appbar.Action
					icon="share"
					onPress={onShareActionPress}
					accessibilityHint="Share post"
					accessibilityLabel="Share post"
				/>
			</Appbar.Header>
			<Video
				controls
				source={{ uri: source }}
				style={styles.backgroundVideo}
				poster={cover}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContainer: {
		margin: 8,
		padding: 4,
		paddingBottom: 24,
	},
	backgroundVideo: {
		flex: 1,
	},
});

export default ArticleScreen;
