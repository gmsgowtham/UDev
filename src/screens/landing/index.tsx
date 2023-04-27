import { View } from "react-native";
import { shallow } from "zustand/shallow";
import { FunctionComponent, memo, useEffect } from "react";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { StackScreenProps } from "@react-navigation/stack";
import ArticleFeed from "../../components/ArticleFeed";
import { useArticleFeedStore } from "../../store/articles";
import type { TabParamList, StackParamList } from "../../router/types";
import HomeAppbar from "../../components/Appbar/HomeAppbar";

type Props = CompositeScreenProps<
	BottomTabScreenProps<TabParamList, "Latest" | "Trending" | "Home">,
	StackScreenProps<StackParamList>
>;

const LandingScreen: FunctionComponent<Props> = ({ navigation }) => {
	const { articles, fetchArticles, fetching } = useArticleFeedStore(
		(state) => ({
			articles: state.featured.articles,
			fetchArticles: state.featured.fetchFeaturedArticles,
			fetching: state.featured.fetching,
		}),
		shallow,
	);

	useEffect(() => {
		fetchArticles();
	}, []);

	const onItemClick = (id: number, title: string) => {
		navigation.navigate("Article", {
			id: id,
		});
	};

	return (
		<>
			<HomeAppbar mode="small" title="Dev Home" />
			<View style={{ flex: 1, paddingHorizontal: 16 }}>
				<ArticleFeed data={articles} onItemClick={onItemClick} />
			</View>
		</>
	);
};

export default memo(LandingScreen);
