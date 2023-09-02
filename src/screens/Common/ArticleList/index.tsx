import { ApiArticleFeedItem } from "../../../api/types";
import HomeAppbar from "../../../components/Appbar/HomeAppbar";
import ArticleFeed from "../../../components/ArticleFeed";
import ListFooterLoader from "../../../components/List/ListFooterLoader";
import NetworkBanner from "../../../components/NetworkBanner";
import FeedSkeleton from "../../../components/Skeleton/FeedSkeleton";
import { StackParamList } from "../../../router/types";
import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FunctionComponent, memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

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
	title,
	error,
}) => {
	const [showNetworkBanner, setShowNetworkBanner] = useState(true);
	const netInfo = useNetInfo();

	useEffect(() => {
		fetchArticles(page);
	}, []);

	const navigation = useNavigation<NavigationProp<StackParamList>>();

	const onItemClick = (id: number) => {
		const article = articles.find((a) => a.id === id);
		if (!article) {
			return;
		}
		navigation.navigate("Article", {
			id: article.id,
			title: article.title,
			url: article.canonical_url,
			cover: article.cover_image ?? "",
			author: {
				name: article.user.name,
				image: article.user.profile_image_90,
			},
			date: article.readable_publish_date,
			tags: article.tag_list,
		});
	};

	const onEndReached = () => {
		if (articles.length < 1) return;

		const next = page + 1;
		fetchArticles(next);
	};

	return (
		<View style={{ flex: 1 }}>
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
	listWrapper: {
		flex: 1,
	},
	listContainer: {
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
});

export default memo(ArticleFeedScreen);
