import { FunctionComponent, memo, useEffect } from "react";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { StackScreenProps } from "@react-navigation/stack";
import ArticleFeed from "../../components/ArticleFeed";
import type { TabParamList, StackParamList } from "../../router/types";
import HomeAppbar from "../../components/Appbar/HomeAppbar";
import { useArticleFeedStore } from "../../store/articles";
import { ActivityIndicator } from "react-native-paper";

type Props = CompositeScreenProps<
	BottomTabScreenProps<TabParamList, "Latest">,
	StackScreenProps<StackParamList>
>;

const LatestScreen: FunctionComponent<Props> = ({ navigation }) => {
	const {
		articles,
		fetchArticles,
		refreshing,
		refreshArticles,
		page,
		loading,
	} = useArticleFeedStore(
		(state) => ({
			articles: state.latest.articles,
			fetchArticles: state.latest.fetchLatestArticles,
			refreshing: state.latest.refreshing,
			refreshArticles: state.latest.refreshLatestArticles,
			page: state.latest.page,
			loading: state.latest.loading,
		}),
		shallow,
	);

	useEffect(() => {
		fetchArticles(page);
	}, []);

	const onItemClick = (id: number, title: string) => {
		navigation.navigate("Article", { id, title });
	};

	const onEndReached = () => {
		console.log("onEndReached");
		const next = page + 1;
		fetchArticles(next);
	};

	return (
		<>
			<HomeAppbar title="Latest" mode="small" />
			<View style={{ flex: 1, paddingHorizontal: 16 }}>
				<ArticleFeed
					data={articles}
					onItemClick={onItemClick}
					listProps={{
						refreshing,
						onRefresh: refreshArticles,
						onEndReached: onEndReached,
						onEndReachedThreshold: 0.85,
						getItemType: (item) => item.type_of,
					}}
				/>
			</View>
		</>
	);
};

export default memo(LatestScreen);
