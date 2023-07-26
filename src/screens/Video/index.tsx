import VideoPlayer from "../../components/VideoPlayer";
import { StackParamList } from "../../router/types";
import { DarkTheme } from "../../theme";
import { logError } from "../../utils/log";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FunctionComponent } from "react";
import { Linking, Share } from "react-native";

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
		<VideoPlayer
			source={{ uri: source }}
			title={title}
			cover={cover}
			onBackActionPress={onBackActionPress}
			onShareActionPress={onShareActionPress}
			onOpenInBrowserActionPress={onOpenInBrowserActionPress}
			theme={DarkTheme}
		/>
	);
};

export default ArticleScreen;
