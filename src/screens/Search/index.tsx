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
import { StyleSheet } from "react-native";
import { List, Searchbar } from "react-native-paper";
import type { ApiArticleFeedItem } from "../../api/types";
import ArticleFeed from "../../components/ArticleFeed";
import ListFooterLoader from "../../components/List/ListFooterLoader";
import FeedSkeleton from "../../components/Skeleton/FeedSkeleton";
import {
	addItemToRecentSearchHistory,
	getRecentSearchHistory,
} from "../../mmkv/searchHistory";
import useArticleFeedStore from "../../store/articles/feed";
import { articleRoute } from "../../utils/router";

const SearchScreen: FunctionComponent = () => {
	const router = useRouter();
	const listRef = useRef<FlashListRef<ApiArticleFeedItem>>(null);
	const [searchHistoryItems, setSearchHistoryItems] = useState<string[]>(() =>
		getRecentSearchHistory(),
	);
	const searchRef = useRef<TextInput>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const {
		articles,
		searchArticles,
		refreshing,
		refreshSearch,
		page,
		loading,
		reset,
	} = useArticleFeedStore((state) => ({
		articles: state.search.articles,
		searchArticles: state.search.searchArticles,
		refreshing: state.search.refreshing,
		refreshSearch: state.search.refreshSearch,
		page: state.search.page,
		loading: state.search.loading,
		reset: state.search.reset,
	}));

	useEffect(() => {
		focusSearchInput();
	}, []);

	const onSearchTextChange = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const onBackIconPress = useCallback(() => {
		reset();
		router.back();
	}, [reset, router]);

	const onSubmit = useCallback(() => {
		if (searchQuery.trim().length < 1) {
			return;
		}

		const q = searchQuery.trim();
		searchArticles(q, 1);
		addItemToRecentSearchHistory(q);
		setSearchHistoryItems(getRecentSearchHistory());
		if (articles.length > 0 && listRef.current) {
			void listRef.current.scrollToIndex({
				animated: true,
				index: 0,
			});
		}
	}, [searchQuery, searchArticles, articles.length]);

	const refreshArticles = useCallback(() => {
		refreshSearch(searchQuery);
	}, [refreshSearch, searchQuery]);

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

		const next = page + 1;
		searchArticles(searchQuery, next);
	}, [articles.length, page, searchArticles, searchQuery]);

	const focusSearchInput = useCallback(() => {
		searchRef.current?.focus();
	}, []);

	const onSearchHistoryItemPress = useCallback(
		(item: string) => {
			setSearchQuery(item);
			searchArticles(item, 1);
			addItemToRecentSearchHistory(item);
			setSearchHistoryItems(getRecentSearchHistory());
		},
		[searchArticles],
	);

	const renderFooter = useCallback(
		() => <ListFooterLoader loading={loading} />,
		[loading],
	);

	const renderHistoryIcon = useCallback(() => <List.Icon icon="history" />, []);

	const listProps = useMemo(
		() => ({
			refreshing,
			onRefresh: refreshArticles,
			onEndReached: onEndReached,
			onEndReachedThreshold: 0.75 as const,
			getItemType: (item: ApiArticleFeedItem) => item.type_of,
			ListFooterComponent: renderFooter,
			contentContainerStyle: styles.listContainer,
		}),
		[refreshing, refreshArticles, onEndReached, renderFooter],
	);

	return (
		<View style={styles.container}>
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
				loading={loading}
				onClearIconPress={focusSearchInput}
			/>
			{!loading && articles.length < 1 && searchHistoryItems.length > 0 ? (
				<List.Section>
					<List.Subheader>History</List.Subheader>
					<View style={{ paddingHorizontal: 12 }}>
						{searchHistoryItems.map((history) => (
							<List.Item
								key={`search-history-item-${history}`}
								title={history}
								left={renderHistoryIcon}
								onPress={() => onSearchHistoryItemPress(history)}
							/>
						))}
					</View>
				</List.Section>
			) : null}
			{loading && articles.length < 1 ? (
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
	listWrapper: {
		flex: 1,
	},
	listContainer: {
		padding: 12,
	},
});

export default SearchScreen;
