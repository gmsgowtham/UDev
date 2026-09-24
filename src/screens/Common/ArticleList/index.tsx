import type { LegendListRef } from "@legendapp/list/react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useRouter } from "expo-router";
import {
	type FunctionComponent,
	type ReactNode,
	memo,
	useCallback,
	useRef,
	useState,
} from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { useTheme } from "react-native-paper";
import type { ApiArticleFeedItem } from "../../../api/types";
import HomeAppbar from "../../../components/Appbar/HomeAppbar";
import ArticleFeed from "../../../components/ArticleFeed";
import ListErrorState from "../../../components/List/ListErrorState";
import ListFooterLoader from "../../../components/List/ListFooterLoader";
import NetworkBanner from "../../../components/NetworkBanner";
import FeedSkeleton from "../../../components/Skeleton/FeedSkeleton";
import { HELP_TEXT } from "../../../utils/const";
import { articleRoute } from "../../../utils/router";

interface ArticleFeedProps {
	title: string;
	articles: ApiArticleFeedItem[];
	fetchNextPage: () => void;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	isPending: boolean;
	isRefetching: boolean;
	refetch: () => Promise<{ isError: boolean }>;
	isError: boolean;
	header?: ReactNode;
}

const ArticleFeedScreen: FunctionComponent<ArticleFeedProps> = ({
	articles,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
	isPending,
	isRefetching,
	refetch,
	isError,
	header,
}) => {
	const listRef = useRef<LegendListRef>(null);

	const [showNetworkBanner, setShowNetworkBanner] = useState(true);
	const netInfo = useNetInfo();

	const router = useRouter();
	const theme = useTheme();

	const onItemClick = useCallback(
		(id: number) => {
			const article = articles.find((a) => a.id === id);
			if (!article) {
				return;
			}
			router.push(
				articleRoute({
					id: article.id,
					title: article.title,
					url: article.url,
					cover: article.cover_image ?? "",
					authorName: article.user.name,
					authorImage: article.user.profile_image_90,
					date: article.readable_publish_date,
					tags: article.tag_list,
					organizationName: article.organization?.name,
				}),
			);
		},
		[articles, router],
	);

	const onEndReached = useCallback(() => {
		if (articles.length < 1) return;
		if (!hasNextPage || isFetchingNextPage) return;

		fetchNextPage();
	}, [articles.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const onRefresh = useCallback(async () => {
		const result = await refetch();
		if (!result.isError) {
			ToastAndroid.showWithGravity(
				HELP_TEXT.FEED_REFRESHED,
				ToastAndroid.SHORT,
				ToastAndroid.TOP,
			);
		}
	}, [refetch]);

	const renderFooter = useCallback(
		() => <ListFooterLoader loading={isFetchingNextPage} />,
		[isFetchingNextPage],
	);

	const onCloseBanner = useCallback(() => setShowNetworkBanner(false), []);

	const onRetry = useCallback(() => {
		refetch();
	}, [refetch]);

	return (
		<View
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<HomeAppbar />
			<NetworkBanner
				visible={isError && !netInfo.isConnected && showNetworkBanner}
				showCloseAction
				onCloseActionPress={onCloseBanner}
			/>
			{header}
			{(isError || netInfo.isConnected === false) && articles.length < 1 ? (
				<ListErrorState
					message={
						netInfo.isConnected === false
							? HELP_TEXT.NETWORK_DISCONNECTED
							: undefined
					}
					onRetry={onRetry}
					retrying={isRefetching && netInfo.isConnected !== false}
				/>
			) : isPending && articles.length < 1 ? (
				<FeedSkeleton />
			) : (
				<View style={styles.listWrapper}>
					<ArticleFeed
						ref={listRef}
						data={articles}
						onItemClick={onItemClick}
						listProps={{
							refreshing: isRefetching,
							onRefresh: onRefresh,
							onEndReached: onEndReached,
							onEndReachedThreshold: 0.75,
							getItemType: (item) => item.type_of,
							ListFooterComponent: renderFooter,
							contentContainerStyle: styles.listContainer,
						}}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listWrapper: {
		flex: 1,
	},
	listContainer: {
		padding: 8,
	},
});

export default memo(ArticleFeedScreen);
