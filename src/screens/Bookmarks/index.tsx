import { useIsFocused } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { type FunctionComponent, memo, useEffect, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
	Appbar,
	Button,
	Dialog,
	Portal,
	Text,
	Tooltip,
} from "react-native-paper";
import ArticleFeedItem from "../../components/ArticleFeedItem";
import FloatingSvg from "../../components/Svg/Floating";
import VideoFeedItem from "../../components/VideoFeedItem";
import { type PostBookmarkItem, getBookmarks } from "../../mmkv/bookmark";
import type { StackParamList } from "../../router/types";

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
		const post = bookmarks.find((b) => b.id === id);
		if (!post) return;

		switch (post.type) {
			case "article":
				navigation.navigate("Article", {
					id: post.id,
					title: post.title,
					url: post.url,
					cover: post.cover ?? "",
					author: {
						name: post.author.name,
						image: post.author.imageUri,
					},
					tags: post.tags,
					date: post.date,
				});
				break;
			case "video":
				navigation.navigate("Video", {
					id: post.id,
					title: post.title,
					url: post.url,
					source: post.source,
					cover: post.cover,
					author: {
						name: post.author.name,
					},
					duration: post.duration,
				});

				break;
		}
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
		switch (item.type) {
			case "article": {
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
			}
			case "video": {
				return (
					<VideoFeedItem
						id={item.id}
						title={item.title}
						duration={item.duration}
						coverImageUri={item.cover}
						author={{
							name: item.author.name,
						}}
						onItemClick={onItemClick}
					/>
				);
			}
		}
	};

	return (
		<View style={styles.container}>
			<Appbar.Header elevated>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title={"Bookmarks"} />
				<Tooltip title="Info">
					<Appbar.Action icon={"info"} onPress={showDialog} />
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
						ItemSeparatorComponent={() => <View style={styles.separator} />}
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
		padding: 12,
	},
	noDataContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 24,
	},
	separator: {
		height: 12,
		backgroundColor: "transparent",
	},
});

export default memo(BookmarksScreen);
