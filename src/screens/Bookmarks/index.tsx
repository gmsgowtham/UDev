import {
	FunctionComponent,
	useState,
	useEffect,
	useCallback,
	memo,
} from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { StackParamList } from "../../router/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ArticleFeedItem from "../../components/ArticleFeedItem";
import { PostBookmarkItem, getBookmarks } from "../../mmkv/bookmark";
import { useIsFocused } from "@react-navigation/native";

type BookmarksScreenProps = NativeStackScreenProps<StackParamList, "Bookmarks">;

const BookmarksScreen: FunctionComponent<BookmarksScreenProps> = ({
	navigation,
}) => {
	const isFocused = useIsFocused();
	const [bookmarks, setBookmarks] = useState<PostBookmarkItem[]>();
	const onItemClick = (id: number, title: string, url: string) => {
		navigation.navigate("Article", { id, title, url });
	};

	useEffect(() => {
		// Re-fetch bookmarks on focus
		// To avoid out of sync state when a bookmark is cancelled
		if (isFocused) {
			setBookmarks(getBookmarks());
		}
	}, [isFocused]);

	const renderItem: ListRenderItem<PostBookmarkItem> = useCallback(
		({ item }: { item: PostBookmarkItem }) => {
			return (
				<ArticleFeedItem
					id={item.id}
					title={item.title}
					author={{
						name: item.author.name,
						imageUri: item.author.imageUri,
					}}
					url={item.url}
					description=""
					dateReadable=""
					onItemClick={onItemClick}
				/>
			);
		},
		[],
	);

	return (
		<View style={styles.container}>
			<Appbar.Header elevated>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title={"Bookmarks"} />
			</Appbar.Header>
			<View style={styles.listWrapper}>
				<FlashList
					showsVerticalScrollIndicator={false}
					onEndReachedThreshold={0.75}
					getItemType={(item) => item.type}
					contentContainerStyle={styles.listContainer}
					data={bookmarks}
					renderItem={renderItem}
					estimatedItemSize={200}
				/>
			</View>
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

export default memo(BookmarksScreen);
