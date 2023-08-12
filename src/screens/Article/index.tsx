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
import { HELP_TEXT } from "../../utils/const";
import { logError } from "../../utils/log";
import { useNetInfo } from "@react-native-community/netinfo";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FunctionComponent, useCallback, useMemo, useState } from "react";
import {
	LayoutChangeEvent,
	Linking,
	Share,
	StyleSheet,
	ToastAndroid,
	View,
} from "react-native";
import { Appbar, Tooltip, useTheme } from "react-native-paper";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

type Props = NativeStackScreenProps<StackParamList, "Article">;

const AnimatedAppbarContent = withAnimated(Appbar.Content);

const ArticleScreen: FunctionComponent<Props> = ({ route, navigation }) => {
	const { params } = route;
	const { id, title, url, cover, author, tags, date } = params;
	const theme = useTheme();
	const netInfo = useNetInfo();
	const _isPostBookmarked = useMemo(() => {
		return isBookmarked(id);
	}, []);
	const [isPostBookmarked, setIsPostBookmarked] = useState(_isPostBookmarked);
	const [showNetworkBanner, setShowNetworkBanner] = useState(true);
	const [headerHeight, setHeaderHeight] = useState(0);

	// Animation primitives
	const scrollY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});
	const appbarContentOpacity = useAnimatedStyle(() => {
		const opacity = interpolate(
			scrollY.value,
			[headerHeight / 1.5, headerHeight],
			[0, 1],
			Extrapolation.CLAMP,
		);
		return {
			opacity,
		};
	});

	const coverTranslate = useAnimatedStyle(() => {
		const translateY = interpolate(
			scrollY.value,
			[0, headerHeight],
			[0, -headerHeight],
			Extrapolation.CLAMP,
		);
		return {
			transform: [{ translateY }],
		};
	});

	const { article, fetchArticle, resetArticle, error } = useArticleStore(
		(state) => ({
			article: state.article,
			fetchArticle: state.fetchArticle,
			resetArticle: state.reset,
			error: state.error,
		}),
	);

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

	const onCoverLayout = (event: LayoutChangeEvent) => {
		setHeaderHeight(Math.round(event.nativeEvent.layout.height));
	};

	const renderContent = useCallback(() => {
		if (article?.body_markdown && headerHeight > 0) {
			return (
				<RenderMarkdownAnimatedFlatList
					onScroll={scrollHandler}
					value={article?.body_markdown}
					flatListProps={{
						scrollEventThrottle: 16,
						contentContainerStyle: {
							paddingTop: headerHeight,
							paddingBottom: 16,
						},
						bounces: false,
						alwaysBounceVertical: false,
						bouncesZoom: false,
						overScrollMode: "never",
					}}
				/>
			);
		}

		if (!article?.body_markdown && headerHeight > 0) {
			return (
				<ArticleSkeleton
					containerStyle={{ padding: 12, paddingTop: headerHeight }}
				/>
			);
		}

		return null;
	}, [article?.body_markdown, headerHeight]);

	return (
		<View style={styles.container}>
			<Appbar.Header elevated style={styles.nav}>
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

			<Animated.View
				style={[
					styles.header,
					{ backgroundColor: theme.colors.background },
					coverTranslate,
				]}
				onLayout={onCoverLayout}
			>
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
			</Animated.View>
			{renderContent()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	nav: {
		zIndex: 2,
	},
	header: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 64,
		zIndex: 1,
	},
});

export default ArticleScreen;
