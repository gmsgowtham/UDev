import { useNetInfo } from "@react-native-community/netinfo";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
	Fragment,
	type FunctionComponent,
	useCallback,
	useMemo,
	useState,
} from "react";
import {
	type LayoutChangeEvent,
	Linking,
	Share,
	StyleSheet,
	ToastAndroid,
	View,
} from "react-native";
import {
	AnimatedFAB,
	Appbar,
	Text,
	Tooltip,
	useTheme,
} from "react-native-paper";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { useArticleDetail } from "../../api/hooks";
import ArticleAnimatedCover from "../../components/ArticleAnimatedCover";
import ListErrorState from "../../components/List/ListErrorState";
import RenderMarkdownAnimatedFlatList from "../../components/Markdown/AnimatedFlatList";
import NetworkBanner from "../../components/NetworkBanner";
import ArticleSkeleton from "../../components/Skeleton/ArticleSkeleton";
import {
	type ArticleBookmarkItem,
	isBookmarked,
	removeBookmark,
	savePostToBookmarks,
} from "../../mmkv/bookmark";
import { HELP_TEXT } from "../../utils/const";
import { logError } from "../../utils/log";
import { firstParam, parseIdParam, parseTagsParam } from "../../utils/router";

const ArticleScreen: FunctionComponent = () => {
	const params = useLocalSearchParams();
	const router = useRouter();
	const id = parseIdParam(params.id);
	const title = firstParam(params.title);
	const url = firstParam(params.url);
	const cover = firstParam(params.cover);
	const authorName = firstParam(params.authorName);
	const authorImage = firstParam(params.authorImage);
	const date = firstParam(params.date);
	const organizationName = firstParam(params.organizationName) || undefined;
	const tags = parseTagsParam(params.tags);
	const theme = useTheme();
	const netInfo = useNetInfo();
	const insets = useSafeAreaInsets();
	const _isPostBookmarked = useMemo(() => {
		return isBookmarked(id);
	}, [id]);
	const [isPostBookmarked, setIsPostBookmarked] = useState(_isPostBookmarked);
	const [showNetworkBanner, setShowNetworkBanner] = useState(true);
	const [headerHeight, setHeaderHeight] = useState(0);
	const [isShareFabExtended, setIsShareFabExtended] = useState(true);

	// Animation primitives
	// scrollY lives on the UI thread; FAB extended state is mirrored there so
	// the RN bridge is only crossed when the boolean actually flips instead of
	// on every scroll frame.
	const scrollY = useSharedValue(0);
	const fabExtendedShared = useSharedValue(true);
	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
		const shouldExtend = event.contentOffset.y <= 0;
		if (shouldExtend !== fabExtendedShared.value) {
			fabExtendedShared.value = shouldExtend;
			scheduleOnRN(setIsShareFabExtended, shouldExtend);
		}
	});

	const appbarContentOpacity = useAnimatedStyle(() => {
		if (headerHeight <= 0) {
			return { opacity: 0 };
		}
		const opacity = interpolate(
			scrollY.value,
			[headerHeight * 0.66, headerHeight * 0.86],
			[0, 1],
			Extrapolation.CLAMP,
		);
		return {
			opacity,
		};
	});

	const coverContainerAnimations = useAnimatedStyle(() => {
		if (headerHeight <= 0) {
			return { transform: [{ translateY: 0 }] };
		}
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

	const coverImageAnimations = useAnimatedStyle(() => {
		if (!cover || headerHeight <= 0) {
			return { opacity: 1 };
		}
		const translateY = interpolate(
			scrollY.value,
			[0, headerHeight],
			[0, headerHeight / 5],
			Extrapolation.CLAMP,
		);
		const opacity = interpolate(
			scrollY.value,
			[0, headerHeight / 2.2],
			[1, 0],
			Extrapolation.CLAMP,
		);
		return {
			opacity,
			transform: [{ translateY }],
		};
	});

	const {
		data: article,
		isError: error,
		isFetching,
		refetch,
	} = useArticleDetail(id);

	const onBackActionPress = useCallback(() => {
		router.back();
	}, [router]);

	const onShareActionPress = useCallback(async () => {
		try {
			await Share.share({
				message: url,
				url: url,
				title: title,
			});
		} catch (e) {
			logError(e as Error, "fn: onShareActionPress exception");
		}
	}, [url, title]);

	const onOpenInBrowserActionPress = useCallback(async () => {
		await Linking.openURL(url);
	}, [url]);

	const onBookmarkActionPress = useCallback(() => {
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
				type: "article",
				author: {
					name: article.user.name,
					imageUri: article.user.profile_image_90,
				},
				cover: article.cover_image,
				tags: article.tags,
				date: article.readable_publish_date,
			} as ArticleBookmarkItem);
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
	}, [isPostBookmarked, id, article, title, url]);

	const onCoverLayout = useCallback((event: LayoutChangeEvent) => {
		const height = Math.round(event.nativeEvent.layout.height);
		setHeaderHeight((prev) => (prev === height ? prev : height));
	}, []);

	const onRetryActionPress = useCallback(() => {
		refetch();
	}, [refetch]);

	const renderContent = useCallback(() => {
		// TanStack Query pauses retries while offline (onlineManager), so the
		// query can sit in pending forever — treat offline + no data as an
		// error instead of an infinite skeleton.
		const isOffline = netInfo.isConnected === false;
		if ((error || isOffline) && !article && headerHeight > 0) {
			return (
				<View style={[styles.errorContainer, { paddingTop: headerHeight }]}>
					<ListErrorState
						message={isOffline ? HELP_TEXT.NETWORK_DISCONNECTED : undefined}
						onRetry={onRetryActionPress}
						retrying={isFetching && !isOffline}
					/>
				</View>
			);
		}

		if (article && headerHeight > 0) {
			if (article.body_markdown) {
				return (
					<Fragment>
						<RenderMarkdownAnimatedFlatList
							onScroll={scrollHandler}
							value={article.body_markdown}
							flatListProps={{
								scrollEventThrottle: 16,
								contentContainerStyle: {
									paddingTop: headerHeight,
									paddingBottom: 80,
								},
								bounces: false,
								alwaysBounceVertical: false,
								bouncesZoom: false,
								overScrollMode: "never",
								scrollToOverflowEnabled: true,
							}}
						/>
						<Tooltip title="Share">
							<AnimatedFAB
								extended={isShareFabExtended}
								icon="share"
								label="Share"
								onPress={onShareActionPress}
								animateFrom="right"
								iconMode="dynamic"
								style={[styles.fab, { bottom: insets.bottom + 16 }]}
							/>
						</Tooltip>
					</Fragment>
				);
			}

			return (
				<View style={[styles.emptyContent, { paddingTop: headerHeight }]}>
					<Text
						variant="bodyLarge"
						style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}
					>
						{HELP_TEXT.ARTICLE_EMPTY}
					</Text>
				</View>
			);
		}

		if (!article && headerHeight > 0) {
			return (
				<ArticleSkeleton
					containerStyle={[
						styles.skeletonContainer,
						{ paddingTop: headerHeight },
					]}
				/>
			);
		}

		return null;
	}, [
		article,
		error,
		headerHeight,
		insets.bottom,
		isFetching,
		isShareFabExtended,
		netInfo.isConnected,
		onRetryActionPress,
		onShareActionPress,
		scrollHandler,
		theme.colors.onSurfaceVariant,
	]);

	return (
		<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
			<Appbar.Header
				elevated={false}
				style={[
					styles.nav,
					{
						backgroundColor: theme.colors.surface,
						borderBottomColor: theme.colors.outlineVariant,
					},
				]}
			>
				<Appbar.BackAction onPress={onBackActionPress} />
				<Animated.View style={[styles.appbarTitle, appbarContentOpacity]}>
					<Appbar.Content title={title} />
				</Animated.View>
				<Tooltip title="Bookmark">
					<Appbar.Action
						icon={isPostBookmarked ? "bookmark-added" : "bookmark-add"}
						iconColor={
							isPostBookmarked ? theme.colors.primary : theme.colors.onSurface
						}
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
				visible={
					error &&
					netInfo.isConnected === false &&
					showNetworkBanner &&
					Boolean(article?.body_markdown)
				}
				onCloseActionPress={() => setShowNetworkBanner(false)}
			/>

			<View style={styles.content}>
				<ArticleAnimatedCover
					id={id}
					title={title}
					cover={cover}
					author={{
						name: authorName,
						imageUri: authorImage,
					}}
					organizationName={organizationName}
					dateReadable={date}
					tags={tags}
					onCoverLayout={onCoverLayout}
					animations={{
						container: coverContainerAnimations,
						image: coverImageAnimations,
					}}
				/>
				{renderContent()}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
	skeletonContainer: {
		padding: 8,
	},
	errorContainer: {
		flex: 1,
	},
	emptyContent: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 32,
	},
	emptyText: {
		textAlign: "center",
	},
	nav: {
		zIndex: 2,
		borderBottomWidth: 1,
	},
	appbarTitle: {
		flex: 1,
		paddingTop: 18,
	},
	fab: {
		position: "absolute",
		right: 16,
		borderRadius: 4,
	},
});

export default ArticleScreen;
