import { useLocalSearchParams, useRouter } from "expo-router";
import { type FunctionComponent, useMemo, useState } from "react";
import { Linking, Share, StyleSheet, ToastAndroid, View } from "react-native";
import { Text } from "react-native-paper";
import VideoPlayer from "../../components/VideoPlayer";
import TopBar from "../../components/VideoPlayer/TopBar";
import YoutubeEmbed from "../../components/YoutubeEmbed";
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
import { getYoutubeVideoId } from "../../utils/url";

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

	const youtubeId = useMemo(() => getYoutubeVideoId(source), [source]);

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

	const topBar = (
		<TopBar
			theme={DarkTheme}
			isBookmarked={isPostBookmarked}
			onBackActionPress={onBackActionPress}
			onShareActionPress={onShareActionPress}
			onBookmarkActionPress={onBookmarkActionPress}
			onOpenInBrowserActionPress={onOpenInBrowserActionPress}
		/>
	);

	// dev.to serves YouTube links as video sources, which expo-video cannot
	// play (it needs a direct media stream). Play those via the YouTube player.
	if (youtubeId) {
		return (
			<View style={styles.youtubeContainer}>
				{topBar}
				<View style={styles.youtubePlayer}>
					<YoutubeEmbed videoId={youtubeId} url={url} autoplay />
				</View>
				<View style={styles.youtubeMeta}>
					<Text
						variant="titleLarge"
						style={{ color: DarkTheme.colors.onSurface }}
					>
						{title}
					</Text>
					{authorName ? (
						<Text
							variant="bodyMedium"
							style={{ color: DarkTheme.colors.onSurfaceVariant }}
						>
							{authorName}
						</Text>
					) : null}
				</View>
			</View>
		);
	}

	if (!source) {
		return (
			<View style={styles.youtubeContainer}>
				{topBar}
				<View style={styles.unavailableContainer}>
					<Text
						variant="bodyLarge"
						style={[
							styles.unavailableText,
							{ color: DarkTheme.colors.onSurfaceVariant },
						]}
					>
						{HELP_TEXT.VIDEO_UNAVAILABLE}
					</Text>
				</View>
			</View>
		);
	}

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

const styles = StyleSheet.create({
	youtubeContainer: {
		flex: 1,
		backgroundColor: "#000",
	},
	youtubePlayer: {
		width: "100%",
	},
	youtubeMeta: {
		paddingHorizontal: 16,
		paddingTop: 16,
		gap: 4,
	},
	unavailableContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 32,
	},
	unavailableText: {
		textAlign: "center",
	},
});

export default VideoScreen;
