import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FunctionComponent, useMemo, useState } from "react";
import { Linking, Share, ToastAndroid } from "react-native";
import VideoPlayer from "../../components/VideoPlayer";
import {
	VideoBookmarkItem,
	isBookmarked,
	removeBookmark,
	savePostToBookmarks,
} from "../../mmkv/bookmark";
import { StackParamList } from "../../router/types";
import { DarkTheme } from "../../theme";
import { HELP_TEXT } from "../../utils/const";
import { logError } from "../../utils/log";

type Props = NativeStackScreenProps<StackParamList, "Video">;

const VideoScreen: FunctionComponent<Props> = ({ route, navigation }) => {
	const { params } = route;
	const { id, source, title, url, cover, author, duration } = params;

	const _isPostBookmarked = useMemo(() => {
		return isBookmarked(id);
	}, []);
	const [isPostBookmarked, setIsPostBookmarked] = useState(_isPostBookmarked);

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

	const onBookmarkActionPress = () => {
		if (isPostBookmarked) {
			setIsPostBookmarked(false);
			removeBookmark(id);
			ToastAndroid.showWithGravity(
				HELP_TEXT.BOOKMARK.REMOVED,
				ToastAndroid.SHORT,
				ToastAndroid.TOP,
			);
		} else {
			setIsPostBookmarked(true);
			const response = savePostToBookmarks({
				id,
				title,
				url,
				type: "video",
				author: {
					name: author.name,
				},
				source: source,
				cover: cover,
				duration: duration,
			} as VideoBookmarkItem);
			if (!response.success) {
				// reset state
				setIsPostBookmarked(false);
			}
			ToastAndroid.showWithGravity(
				response.message,
				ToastAndroid.SHORT,
				ToastAndroid.TOP,
			);
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
			isBookmarked={isPostBookmarked}
			onBackActionPress={onBackActionPress}
			onBookmarkActionPress={onBookmarkActionPress}
			onShareActionPress={onShareActionPress}
			onOpenInBrowserActionPress={onOpenInBrowserActionPress}
			theme={DarkTheme}
		/>
	);
};

export default VideoScreen;
