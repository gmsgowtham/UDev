import { memo } from "react";
import { shallow } from "zustand/shallow";

import useArticleFeedStore from "../../store/articles/feed";
import ArticleFeedScreen from "../Common/ArticleList";

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
			articles: state.featured.articles,
			fetchArticles: state.featured.fetchFeaturedArticles,
			refreshing: state.featured.refreshing,
			refreshArticles: state.featured.refreshFeaturedArticles,
			page: state.featured.page,
			loading: state.featured.loading,
		}),
		shallow,
	);

	return (
		<ArticleFeedScreen
			title="Featured"
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
