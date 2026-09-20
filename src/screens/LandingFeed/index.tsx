import { memo, useMemo } from "react";
import { useFeaturedArticles } from "../../api/hooks";
import ArticleFeedScreen from "../Common/ArticleList";

const LandingScreen = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isPending,
		isRefetching,
		refetch,
		isError,
	} = useFeaturedArticles();

	const articles = useMemo(() => data?.pages.flat() ?? [], [data]);

	return (
		<ArticleFeedScreen
			title="Featured"
			articles={articles}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage ?? false}
			isFetchingNextPage={isFetchingNextPage}
			isPending={isPending}
			isRefetching={isRefetching}
			refetch={refetch}
			isError={isError}
		/>
	);
};

export default memo(LandingScreen);
