import { FunctionComponent, memo } from "react";
import { shallow } from "zustand/shallow";

import { useArticleFeedStore } from "../../store/articles";
import ArticleFeedScreen from "../Common/ArticleFeed";

const LatestScreen: FunctionComponent = () => {
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

	return (
		<ArticleFeedScreen
			title="Latest"
			articles={articles}
			fetchArticles={fetchArticles}
			refreshing={refreshing}
			refreshArticles={refreshArticles}
			page={page}
			loading={loading}
		/>
	);
};

export default memo(LatestScreen);
