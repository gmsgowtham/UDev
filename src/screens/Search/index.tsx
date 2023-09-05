import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
	FunctionComponent,
	RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { View } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import ArticleFeed from "../../components/ArticleFeed";
import ListFooterLoader from "../../components/List/ListFooterLoader";
import FeedSkeleton from "../../components/Skeleton/FeedSkeleton";
import { StackParamList } from "../../router/types";
import useArticleFeedStore from "../../store/articles/feed";

type Props = NativeStackScreenProps<StackParamList, "Search">;

const SearchScreen: FunctionComponent<Props> = ({ navigation }) => {
	const searchRef = useRef() as RefObject<TextInput>;
	const [searchQuery, setSearchQuery] = useState("");
	const {
		articles,
		searchArticles,
		refreshing,
		refreshSearch,
		page,
		loading,
		error,
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

		searchArticles(searchQuery.trim(), 1);
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
			{loading && articles.length < 1 ? (
				<FeedSkeleton />
			) : (
				<View style={styles.listWrapper}>
					<ArticleFeed
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
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
});

export default SearchScreen;
