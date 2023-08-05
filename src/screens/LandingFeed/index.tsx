import useArticleFeedStore from "../../store/articles/feed";
import ArticleFeedScreen from "../Common/ArticleList";
import { memo } from "react";

const LandingScreen = () => {
	const {
		articles,
		fetchArticles,
		refreshing,
		refreshArticles,
		page,
		loading,
		error,
	} = useArticleFeedStore((state) => ({
		articles: state.featured.articles,
		fetchArticles: state.featured.fetchFeaturedArticles,
		refreshing: state.featured.refreshing,
		refreshArticles: state.featured.refreshFeaturedArticles,
		page: state.featured.page,
		loading: state.featured.loading,
		error: state.featured.error,
	}));

	return (
		<ArticleFeedScreen
			title="Featured"
			articles={articles}
			fetchArticles={fetchArticles}
			refreshing={refreshing}
			refreshArticles={refreshArticles}
			page={page}
			loading={loading}
			error={error}
		/>
	);
};

export default memo(LandingScreen);
