import { useNetInfo } from "@react-native-community/netinfo";
import type { FlashListRef } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import {
	type FunctionComponent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { View } from "react-native";
import type { TextInput } from "react-native";
import { StyleSheet, ToastAndroid } from "react-native";
import { List, Searchbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSearchArticles } from "../../api/hooks";
import type { ApiArticleFeedItem } from "../../api/types";
import ArticleFeed from "../../components/ArticleFeed";
import ListErrorState from "../../components/List/ListErrorState";
import ListFooterLoader from "../../components/List/ListFooterLoader";
import FeedSkeleton from "../../components/Skeleton/FeedSkeleton";
import {
	addItemToRecentSearchHistory,
	getRecentSearchHistory,
} from "../../mmkv/searchHistory";
import { HELP_TEXT } from "../../utils/const";
import { articleRoute } from "../../utils/router";

const SearchScreen: FunctionComponent = () => {
	const router = useRouter();
	const theme = useTheme();
	const netInfo = useNetInfo();
	const insets = useSafeAreaInsets();
	const listRef = useRef<FlashListRef<ApiArticleFeedItem>>(null);
	const [searchHistoryItems, setSearchHistoryItems] = useState<string[]>(() =>
		getRecentSearchHistory(),
	);
	const searchRef = useRef<TextInput>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [submittedQuery, setSubmittedQuery] = useState("");
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isPending,
		isFetching,
		isRefetching,
		isError,
		refetch,
	} = useSearchArticles(submittedQuery);

	const articles = useMemo(() => data?.pages.flat() ?? [], [data]);
	const isInitialLoading =
		submittedQuery.length > 0 && isPending && articles.length < 1;

	useEffect(() => {
		focusSearchInput();
	}, []);

	const onSearchTextChange = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const onBackIconPress = useCallback(() => {
		router.back();
	}, [router]);

	const onSubmit = useCallback(() => {
		if (searchQuery.trim().length < 1) {
			return;
		}

		const q = searchQuery.trim();
		setSubmittedQuery(q);
		addItemToRecentSearchHistory(q);
		setSearchHistoryItems(getRecentSearchHistory());
		if (articles.length > 0 && listRef.current) {
			void listRef.current.scrollToIndex({
				animated: true,
				index: 0,
			});
		}
	}, [searchQuery, articles.length]);

	const refreshArticles = useCallback(async () => {
		const result = await refetch();
		if (!result.isError) {
			ToastAndroid.showWithGravity(
				HELP_TEXT.FEED_REFRESHED,
				ToastAndroid.SHORT,
				ToastAndroid.TOP,
			);
		}
	}, [refetch]);

	const onItemClick = useCallback(
		(id: number) => {
			const article = articles.find((a) => a.id === id);
			if (!article) {
				return;
			}
			router.push(
				articleRoute({
					id: article.id,
					title: article.title,
					url: article.canonical_url,
					cover: article.cover_image ?? "",
					authorName: article.user.name,
					authorImage: article.user.profile_image_90,
					date: article.readable_publish_date,
					tags: article.tag_list,
					organizationName: article.organization?.name,
				}),
			);
		},
		[articles, router],
	);

	const onEndReached = useCallback(() => {
		if (articles.length < 1) return;
		if (!hasNextPage || isFetchingNextPage) return;

		fetchNextPage();
	}, [articles.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const focusSearchInput = useCallback(() => {
		searchRef.current?.focus();
	}, []);

	const onClearIconPress = useCallback(() => {
		setSearchQuery("");
		searchRef.current?.focus();
	}, []);

	const onSearchHistoryItemPress = useCallback((item: string) => {
		setSearchQuery(item);
		setSubmittedQuery(item);
		addItemToRecentSearchHistory(item);
		setSearchHistoryItems(getRecentSearchHistory());
	}, []);

	const renderFooter = useCallback(
		() => <ListFooterLoader loading={isFetchingNextPage} />,
		[isFetchingNextPage],
	);

	const onRetry = useCallback(() => {
		refetch();
	}, [refetch]);

	const renderHistoryIcon = useCallback(() => <List.Icon icon="history" />, []);

	const listProps = useMemo(
		() => ({
			refreshing: isRefetching,
			onRefresh: refreshArticles,
			onEndReached: onEndReached,
			onEndReachedThreshold: 0.75 as const,
			getItemType: (item: ApiArticleFeedItem) => item.type_of,
			ListFooterComponent: renderFooter,
			contentContainerStyle: styles.listContainer,
		}),
		[isRefetching, refreshArticles, onEndReached, renderFooter],
	);

	return (
		<View
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<View
				style={{
					paddingTop: insets.top,
					backgroundColor: theme.colors.surface,
				}}
			>
				<Searchbar
					showDivider={false}
					onSubmitEditing={onSubmit}
					ref={searchRef}
					mode="view"
					icon="arrow-back"
					onIconPress={onBackIconPress}
					placeholder="Search articles"
					onChangeText={onSearchTextChange}
					value={searchQuery}
					loading={submittedQuery.length > 0 && isFetching}
					onClearIconPress={onClearIconPress}
					style={[
						styles.searchbar,
						{
							backgroundColor: theme.colors.surface,
							borderBottomColor: theme.colors.outlineVariant,
						},
					]}
				/>
			</View>
			{!isInitialLoading &&
			articles.length < 1 &&
			searchHistoryItems.length > 0 ? (
				<List.Section>
					<List.Subheader>History</List.Subheader>
					<View style={{ paddingHorizontal: 12 }}>
						{searchHistoryItems.map((history, index) => (
							<List.Item
								key={`search-history-item-${history}`}
								testID={`search-history-item-${index}`}
								title={history}
								left={renderHistoryIcon}
								onPress={() => onSearchHistoryItemPress(history)}
							/>
						))}
					</View>
				</List.Section>
			) : null}
			{(isError || netInfo.isConnected === false) &&
			submittedQuery.length > 0 &&
			articles.length < 1 ? (
				<ListErrorState
					message={
						netInfo.isConnected === false
							? HELP_TEXT.NETWORK_DISCONNECTED
							: undefined
					}
					onRetry={onRetry}
					retrying={isRefetching && netInfo.isConnected !== false}
				/>
			) : isInitialLoading ? (
				<FeedSkeleton />
			) : (
				<View style={styles.listWrapper}>
					<ArticleFeed
						ref={listRef}
						data={articles}
						onItemClick={onItemClick}
						listProps={listProps}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchbar: {
		borderBottomWidth: 1,
	},
	listWrapper: {
		flex: 1,
	},
	listContainer: {
		padding: 8,
	},
});

export default SearchScreen;
