import { memo, useMemo } from "react";
import { useTopArticles } from "../../api/hooks";
import ArticleFeedScreen from "../Common/ArticleList";

const TopFeedScreen = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isPending,
		isRefetching,
		refetch,
		isError,
	} = useTopArticles();

	const articles = useMemo(() => data?.pages.flat() ?? [], [data]);

	return (
		<ArticleFeedScreen
			title="Top"
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

export default memo(TopFeedScreen);
