import ArticleCover from "../../components/ArticleCover";
import { RenderMarkdownAnimatedFlatList } from "../../components/Markdown";
import NetworkBanner from "../../components/NetworkBanner";
import ArticleSkeleton from "../../components/Skeleton/ArticleSkeleton";
import { withAnimated } from "../../hoc/withAnimated";
import {
	isBookmarked,
	removeBookmark,
	savePostToBookmarks,
} from "../../mmkv/bookmark";
import { StackParamList } from "../../router/types";
import useArticleStore from "../../store/articles/article";
import { ARTICLE_COVER_IMAGE_ASPECT_RATIO, HELP_TEXT } from "../../utils/const";
import { logError } from "../../utils/log";
import { useNetInfo } from "@react-native-community/netinfo";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Linking, Share, StyleSheet, ToastAndroid, View } from "react-native";
import { Appbar, Tooltip } from "react-native-paper";
import {
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

type Props = NativeStackScreenProps<StackParamList, "Article">;

const AnimatedAppbarContent = withAnimated(Appbar.Content);

const authorHeight = 65;
const assumedTitleHeight = 54;

const ArticleScreen: FunctionComponent<Props> = ({ route, navigation }) => {
	const { params } = route;
	const { id, title, url, cover, author, tags, date } = params;
	const netInfo = useNetInfo();
	const { width: windowWidth } = useWindowDimensions();
	const _isPostBookmarked = useMemo(() => {
		return isBookmarked(id);
	}, []);
	const [isPostBookmarked, setIsPostBookmarked] = useState(_isPostBookmarked);
	const [showNetworkBanner, setShowNetworkBanner] = useState(true);

	// Animation primitives
	const scrollY = useSharedValue(0);
	const [interpolateRangeStart, interpolateRangeEnd] = useMemo(() => {
		let heightWithoutTitle = authorHeight;
		if (cover) {
			heightWithoutTitle =
				windowWidth / ARTICLE_COVER_IMAGE_ASPECT_RATIO + authorHeight;
		}

		return [heightWithoutTitle, heightWithoutTitle + assumedTitleHeight];
	}, [cover, windowWidth]);
	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});
	const appbarContentOpacity = useAnimatedStyle(() => {
		const opacity = interpolate(
			scrollY.value,
			[interpolateRangeStart, interpolateRangeEnd],
			[0, 1],
			Extrapolation.CLAMP,
		);
		return {
			opacity,
		};
	});

	const { article, loading, fetchArticle, resetArticle, error } =
		useArticleStore((state) => ({
			article: state.article,
			fetchArticle: state.fetchArticle,
			resetArticle: state.reset,
			loading: state.loading,
			error: state.error,
		}));

	useFocusEffect(
		useCallback(() => {
			fetchArticle(id);

			return () => {
				// Resets article state
				resetArticle();
			};
		}, []),
	);

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
			if (!article) return;
			setIsPostBookmarked(true);
			const response = savePostToBookmarks({
				id,
				title,
				url,
				type: article.type_of,
				author: {
					name: article.user.name,
					imageUri: article.user.profile_image_90,
				},
				cover: article.cover_image,
				tags: article.tags,
				date: article.readable_publish_date,
			});
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

	const renderListHeaderComponent = useCallback(() => {
		return (
			<ArticleCover
				id={id}
				title={title}
				cover={cover}
				author={{
					name: author.name,
					imageUri: author.image,
				}}
				dateReadable={date}
				tags={tags}
			/>
		);
	}, [article]);

	return (
		<View style={styles.container}>
			<Appbar.Header elevated>
				<Appbar.BackAction onPress={onBackActionPress} />
				<AnimatedAppbarContent title={title} style={[appbarContentOpacity]} />
				<Tooltip title="Share">
					<Appbar.Action
						icon="share"
						onPress={onShareActionPress}
						accessibilityHint="Share post"
						accessibilityLabel="Share post"
					/>
				</Tooltip>
				<Tooltip title="Bookmark">
					<Appbar.Action
						icon={isPostBookmarked ? "bookmark" : "bookmark-outline"}
						onPress={onBookmarkActionPress}
						accessibilityHint="Bookmark post"
						accessibilityLabel="Bookmark post"
					/>
				</Tooltip>
				<Tooltip title="Open in browser">
					<Appbar.Action
						icon="launch"
						onPress={onOpenInBrowserActionPress}
						accessibilityHint="Open in browser"
						accessibilityLabel="Open in browser"
					/>
				</Tooltip>
			</Appbar.Header>

			<NetworkBanner
				showCloseAction
				visible={error && !netInfo.isConnected && showNetworkBanner}
				onCloseActionPress={() => setShowNetworkBanner(false)}
			/>
			<RenderMarkdownAnimatedFlatList
				onScroll={scrollHandler}
				loadingState={loading}
				value={article?.body_markdown}
				headerComponent={renderListHeaderComponent}
				loadingPlaceholder={<ArticleSkeleton />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default ArticleScreen;
