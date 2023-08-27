import ArticleFeedItem from "../../components/ArticleFeedItem";
import FloatingSvg from "../../components/Svg/Floating";
import { PostBookmarkItem, getBookmarks } from "../../mmkv/bookmark";
import { StackParamList } from "../../router/types";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { FunctionComponent, memo, useEffect, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
	Appbar,
	Button,
	Dialog,
	Portal,
	Text,
	Tooltip,
} from "react-native-paper";

type BookmarksScreenProps = NativeStackScreenProps<StackParamList, "Bookmarks">;

const BookmarksScreen: FunctionComponent<BookmarksScreenProps> = ({
	navigation,
}) => {
	const isFocused = useIsFocused();
	const { width } = useWindowDimensions();
	const [bookmarks, setBookmarks] = useState<PostBookmarkItem[]>([]);
	const [dialogVisible, setDialogVisible] = useState(false);

	const showDialog = () => setDialogVisible(true);
	const hideDialog = () => setDialogVisible(false);

	const onItemClick = (id: number) => {
		const article = bookmarks.find((b) => b.id === id);
		if (!article) return;

		navigation.navigate("Article", {
			id: article.id,
			title: article.title,
			url: article.url,
			cover: article.cover ?? "",
			author: {
				name: article.author.name,
				image: article.author.imageUri,
			},
			tags: article.tags,
			date: article.date,
		});
	};

	useEffect(() => {
		// Re-fetch bookmarks on focus
		// To avoid out of sync state when a bookmark is cancelled
		if (isFocused) {
			setBookmarks(() => {
				return getBookmarks();
			});
		}
	}, [isFocused]);

	const renderItem: ListRenderItem<PostBookmarkItem> = ({
		item,
	}: { item: PostBookmarkItem }) => {
		return (
			<ArticleFeedItem
				id={item.id}
				title={item.title}
				author={{
					name: item.author.name,
					imageUri: item.author.imageUri,
				}}
				coverImageUri={item.cover}
				description=""
				dateReadable={item.date}
				onItemClick={onItemClick}
				tags={item.tags}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<Appbar.Header elevated>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title={"Bookmarks"} />
				<Tooltip title="Info">
					<Appbar.Action icon={"information"} onPress={showDialog} />
				</Tooltip>
			</Appbar.Header>
			{bookmarks.length < 1 ? (
				<View style={styles.noDataContainer}>
					<FloatingSvg width={width / 1.2} />
					<Text variant="labelLarge">It's void out there.....</Text>
				</View>
			) : (
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
			)}
			<Portal>
				<Dialog
					dismissable
					dismissableBackButton
					visible={dialogVisible}
					onDismiss={hideDialog}
				>
					<Dialog.Title>Bookmarks Storage Info</Dialog.Title>
					<Dialog.Content>
						<Text variant="bodyLarge">
							This application keeps your bookmarks saved directly on your
							device. The data is kept in a dedicated location and isn't
							accessible to other apps.
							{"\n\n"}
							When you decide to uninstall this application, the locally stored
							data will be removed as well. Please be aware that once the app is
							uninstalled, the stored data cannot be restored.
						</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Ok, Understood</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
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
	noDataContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 24,
	},
});

export default memo(BookmarksScreen);
