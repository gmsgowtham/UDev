import useArticleFeedStore from "../../store/articles/feed";
import ArticleFeedScreen from "../Common/ArticleList";
import { FunctionComponent, memo } from "react";
import { shallow } from "zustand/shallow";

const LatestScreen: FunctionComponent = () => {
	const {
		articles,
		fetchArticles,
		refreshing,
		refreshArticles,
		page,
		loading,
		error,
	} = useArticleFeedStore(
		(state) => ({
			articles: state.latest.articles,
			fetchArticles: state.latest.fetchLatestArticles,
			refreshing: state.latest.refreshing,
			refreshArticles: state.latest.refreshLatestArticles,
			page: state.latest.page,
			loading: state.latest.loading,
			error: state.latest.error,
		}),
		shallow,
	);

	return (
		<ArticleFeedScreen
			title="Latest"
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

export default memo(LatestScreen);
