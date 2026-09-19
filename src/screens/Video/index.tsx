import { useLocalSearchParams, useRouter } from "expo-router";
import { type FunctionComponent, useMemo, useState } from "react";
import { Linking, Share, ToastAndroid } from "react-native";
import VideoPlayer from "../../components/VideoPlayer";
import {
	type VideoBookmarkItem,
	isBookmarked,
	removeBookmark,
	savePostToBookmarks,
} from "../../mmkv/bookmark";
import { DarkTheme } from "../../theme";
import { HELP_TEXT } from "../../utils/const";
import { logError } from "../../utils/log";
import { firstParam, parseIdParam } from "../../utils/router";

const VideoScreen: FunctionComponent = () => {
	const params = useLocalSearchParams();
	const router = useRouter();
	const id = parseIdParam(params.id);
	const title = firstParam(params.title);
	const url = firstParam(params.url);
	const source = firstParam(params.source);
	const cover = firstParam(params.cover);
	const authorName = firstParam(params.authorName);
	const duration = firstParam(params.duration);

	const _isPostBookmarked = useMemo(() => {
		return isBookmarked(id);
	}, [id]);
	const [isPostBookmarked, setIsPostBookmarked] = useState(_isPostBookmarked);

	const onBackActionPress = () => {
		router.back();
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
					name: authorName,
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
