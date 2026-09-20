import { type FunctionComponent, memo, useMemo } from "react";
import { useLatestArticles } from "../../api/hooks";
import ArticleFeedScreen from "../Common/ArticleList";

const LatestScreen: FunctionComponent = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isPending,
		isRefetching,
		refetch,
		isError,
	} = useLatestArticles();

	const articles = useMemo(() => data?.pages.flat() ?? [], [data]);

	return (
		<ArticleFeedScreen
			title="Latest"
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

export default memo(LatestScreen);
