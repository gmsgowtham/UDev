import { memo, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useTopArticles } from "../../api/hooks";
import type { TopFeedScope } from "../../utils/const";
import ArticleFeedScreen from "../Common/ArticleList";

const SCOPES: { value: TopFeedScope; label: string; testID: string }[] = [
	{ value: "week", label: "Week", testID: "top-scope-week" },
	{ value: "month", label: "Month", testID: "top-scope-month" },
	{ value: "year", label: "Year", testID: "top-scope-year" },
];

const TopFeedScreen = () => {
	const [scope, setScope] = useState<TopFeedScope>("week");
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isPending,
		isRefetching,
		refetch,
		isError,
	} = useTopArticles(scope);

	const articles = useMemo(() => data?.pages.flat() ?? [], [data]);

	return (
		<ArticleFeedScreen
			key={scope}
			title="Top"
			articles={articles}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage ?? false}
			isFetchingNextPage={isFetchingNextPage}
			isPending={isPending}
			isRefetching={isRefetching}
			refetch={refetch}
			isError={isError}
			header={
				<View style={styles.scopeContainer}>
					<SegmentedButtons
						value={scope}
						onValueChange={(value) => setScope(value as TopFeedScope)}
						buttons={SCOPES}
					/>
				</View>
			}
		/>
	);
};

const styles = StyleSheet.create({
	scopeContainer: {
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
});

export default memo(TopFeedScreen);
