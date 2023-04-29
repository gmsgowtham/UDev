import { memo } from "react";
import { shallow } from "zustand/shallow";

import { useArticleFeedStore } from "../../store/articles";
import ArticleFeedScreen from "../Common/ArticleFeed";

const LandingScreen = () => {
	const {
		articles,
		fetchArticles,
		refreshing,
		refreshArticles,
		page,
		loading,
	} = useArticleFeedStore(
		(state) => ({
			articles: state.trending.articles,
			fetchArticles: state.trending.fetchTrendingArticles,
			refreshing: state.trending.refreshing,
			refreshArticles: state.trending.refreshTrendingArticles,
			page: state.trending.page,
			loading: state.trending.loading,
		}),
		shallow,
	);

	return (
		<ArticleFeedScreen
			title="Trending"
			articles={articles}
			fetchArticles={fetchArticles}
			refreshing={refreshing}
			refreshArticles={refreshArticles}
			page={page}
			loading={loading}
		/>
	);
};

export default memo(LandingScreen);
