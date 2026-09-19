import { useNetInfo } from "@react-native-community/netinfo";
import type { FlashListRef } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import {
	type FunctionComponent,
	memo,
	useEffect,
	useRef,
	useState,
} from "react";
import { StyleSheet, View } from "react-native";
import type { ApiArticleFeedItem } from "../../../api/types";
import HomeAppbar from "../../../components/Appbar/HomeAppbar";
import ArticleFeed from "../../../components/ArticleFeed";
import ListFooterLoader from "../../../components/List/ListFooterLoader";
import NetworkBanner from "../../../components/NetworkBanner";
import FeedSkeleton from "../../../components/Skeleton/FeedSkeleton";
import { articleRoute } from "../../../utils/router";

interface ArticleFeedProps {
	title: string;
	articles: ApiArticleFeedItem[];
	fetchArticles: (page: number) => void;
	refreshing: boolean;
	refreshArticles: () => void;
	page: number;
	loading: boolean;
	error: boolean;
}

const ArticleFeedScreen: FunctionComponent<ArticleFeedProps> = ({
	articles,
	fetchArticles,
	refreshing,
	refreshArticles,
	page,
	loading,
	error,
}) => {
	const listRef = useRef<FlashListRef<ApiArticleFeedItem>>(null);

	const [showNetworkBanner, setShowNetworkBanner] = useState(true);
	const netInfo = useNetInfo();

	useEffect(() => {
		fetchArticles(page);
	}, [page, fetchArticles]);

	const router = useRouter();

	const onItemClick = (id: number) => {
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
	};

	const onEndReached = () => {
		if (articles.length < 1) return;

		const next = page + 1;
		fetchArticles(next);
	};

	return (
		<View style={styles.container}>
			<HomeAppbar />
			<NetworkBanner
				visible={error && !netInfo.isConnected && showNetworkBanner}
				showCloseAction
				onCloseActionPress={() => setShowNetworkBanner(false)}
			/>
			{loading && articles.length < 1 ? (
				<FeedSkeleton />
			) : (
				<View style={styles.listWrapper}>
					<ArticleFeed
						ref={listRef}
						data={articles}
						onItemClick={onItemClick}
						listProps={{
							refreshing,
							onRefresh: refreshArticles,
							onEndReached: onEndReached,
							onEndReachedThreshold: 0.75,
							getItemType: (item) => item.type_of,
							ListFooterComponent: () => <ListFooterLoader loading={loading} />,
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
		padding: 12,
	},
});

export default memo(ArticleFeedScreen);
