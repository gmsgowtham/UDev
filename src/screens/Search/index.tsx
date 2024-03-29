import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FlashList } from "@shopify/flash-list";
import {
	type FunctionComponent,
	type RefObject,
	useEffect,
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
import type { StackParamList } from "../../router/types";
import useArticleFeedStore from "../../store/articles/feed";

type Props = NativeStackScreenProps<StackParamList, "Search">;

const SearchScreen: FunctionComponent<Props> = ({ navigation }) => {
	const listRef = useRef(null);
	const searchHistoryItems = getRecentSearchHistory();
	const searchRef = useRef() as RefObject<TextInput>;
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
		error: state.search.error,
		reset: state.search.reset,
	}));

	useEffect(() => {
		focusSearchInput();
	}, []);

	const onSearchTextChange = (query: string) => {
		setSearchQuery(query);
	};

	const onBackIconPress = () => {
		reset();
		navigation.goBack();
	};

	const onSubmit = () => {
		if (searchQuery.trim().length < 1) {
			return;
		}

		const q = searchQuery.trim();
		searchArticles(q, 1);
		addItemToRecentSearchHistory(q);
		if (articles.length > 0 && listRef.current) {
			(listRef.current as FlashList<ApiArticleFeedItem>).scrollToIndex({
				animated: true,
				index: 0,
			});
		}
	};

	const refreshArticles = () => {
		refreshSearch(searchQuery);
	};

	const onItemClick = (id: number) => {
		const article = articles.find((a) => a.id === id);
		if (!article) {
			return;
		}
		navigation.navigate("Article", {
			id: article.id,
			title: article.title,
			url: article.canonical_url,
			cover: article.cover_image ?? "",
			author: {
				name: article.user.name,
				image: article.user.profile_image_90,
			},
			date: article.readable_publish_date,
			tags: article.tag_list,
			organizationName: article.organization?.name,
		});
	};

	const onEndReached = () => {
		if (articles.length < 1) return;

		const next = page + 1;
		searchArticles(searchQuery, next);
	};

	const focusSearchInput = () => {
		searchRef.current?.focus();
	};

	const onSearchHistoryItemPress = (item: string) => {
		setSearchQuery(item);
		searchArticles(item, 1);
		addItemToRecentSearchHistory(item);
	};

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
								left={() => <List.Icon icon="history" />}
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
						listProps={{
							refreshing,
							onRefresh: refreshArticles,
							onEndReached: onEndReached,
							onEndReachedThreshold: 0.75,
							getItemType: (item) => item.type_of,
							ListFooterComponent: () => <ListFooterLoader loading={loading} />,
							contentContainerStyle: styles.listContainer,
						}}
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
