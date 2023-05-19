import { FunctionComponent, memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { NavigationProp, useNavigation } from "@react-navigation/native";

import { ApiArticleFeedItem } from "../../../api/types";
import HomeAppbar from "../../../components/Appbar/HomeAppbar";
import ArticleFeed from "../../../components/ArticleFeed";
import { StackParamList } from "../../../router/types";
import PageLoader from "../../../components/Loader/PageLoader";

interface ArticleFeedProps {
	title: string;
	articles: ApiArticleFeedItem[];
	fetchArticles: (page: number) => void;
	refreshing: boolean;
	refreshArticles: () => void;
	page: number;
	loading: boolean;
}

interface ListFooterProps {
	loading: boolean;
}

const ListFooter = memo<ListFooterProps>(({ loading }) => {
	if (loading) {
		return (
			<View>
				<ActivityIndicator size="small" />
			</View>
		);
	}

	return null;
});

const ArticleFeedScreen: FunctionComponent<ArticleFeedProps> = ({
	articles,
	fetchArticles,
	refreshing,
	refreshArticles,
	page,
	loading,
	title,
}) => {
	useEffect(() => {
		fetchArticles(page);
	}, []);

	const navigation = useNavigation<NavigationProp<StackParamList>>();

	const onItemClick = (id: number, title: string, url: string) => {
		navigation.navigate("Article", { id, title, url });
	};

	const onEndReached = () => {
		const next = page + 1;
		fetchArticles(next);
	};

	return (
		<View style={{ flex: 1 }}>
			<HomeAppbar title={title} />
			{loading && articles.length < 1 ? (
				<PageLoader />
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
							ListFooterComponent: () => <ListFooter loading={loading} />,
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
