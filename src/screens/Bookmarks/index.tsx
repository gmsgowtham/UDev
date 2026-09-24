import {
	LegendList,
	type LegendListRenderItemProps,
} from "@legendapp/list/react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { type FunctionComponent, memo, useCallback, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
	Appbar,
	Button,
	Dialog,
	Portal,
	Text,
	Tooltip,
	useTheme,
} from "react-native-paper";
import ArticleFeedItem from "../../components/ArticleFeedItem";
import FloatingSvg from "../../components/Svg/Floating";
import VideoFeedItem from "../../components/VideoFeedItem";
import { type PostBookmarkItem, getBookmarks } from "../../mmkv/bookmark";
import { articleRoute, videoRoute } from "../../utils/router";
import { getYoutubeThumbnailUrl, getYoutubeVideoId } from "../../utils/url";

const FeedSeparator = () => <View style={styles.separator} />;

const keyExtractor = (item: PostBookmarkItem) => String(item.id);

const BookmarksScreen: FunctionComponent = () => {
	const router = useRouter();
	const theme = useTheme();
	const { width } = useWindowDimensions();
	const [bookmarks, setBookmarks] = useState<PostBookmarkItem[]>([]);
	const [dialogVisible, setDialogVisible] = useState(false);

	const showDialog = useCallback(() => setDialogVisible(true), []);
	const hideDialog = useCallback(() => setDialogVisible(false), []);

	const onItemClick = useCallback(
		(id: number) => {
			const post = bookmarks.find((b) => b.id === id);
			if (!post) return;

			switch (post.type) {
				case "article":
					router.push(
						articleRoute({
							id: post.id,
							title: post.title,
							url: post.url,
							cover: post.cover ?? "",
							authorName: post.author.name,
							authorImage: post.author.imageUri,
							date: post.date,
							tags: post.tags,
						}),
					);
					break;
				case "video":
					router.push(
						videoRoute({
							id: post.id,
							title: post.title,
							url: post.url,
							source: post.source,
							cover: post.cover,
							authorName: post.author.name,
							duration: post.duration,
						}),
					);

					break;
			}
		},
		[bookmarks, router],
	);

	useFocusEffect(
		useCallback(() => {
			setBookmarks(() => {
				return getBookmarks();
			});
		}, []),
	);

	const renderItem = useCallback(
		({ item }: LegendListRenderItemProps<PostBookmarkItem>) => {
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
					const youtubeId = getYoutubeVideoId(item.source ?? "");
					return (
						<VideoFeedItem
							id={item.id}
							title={item.title}
							duration={item.duration}
							thumbnailUri={
								youtubeId ? getYoutubeThumbnailUrl(youtubeId) : null
							}
							author={{
								name: item.author.name,
							}}
							onItemClick={onItemClick}
						/>
					);
				}
			}
		},
		[onItemClick],
	);

	const onBackPress = useCallback(() => router.back(), [router]);

	return (
		<View
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<Appbar.Header
				elevated={false}
				style={[
					styles.header,
					{
						backgroundColor: theme.colors.surface,
						borderBottomColor: theme.colors.outlineVariant,
					},
				]}
			>
				<Appbar.BackAction onPress={onBackPress} />
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
					<LegendList
						showsVerticalScrollIndicator={false}
						onEndReachedThreshold={0.75}
						getItemType={(item) => item.type}
						estimatedItemSize={300}
						contentContainerStyle={styles.listContainer}
						data={bookmarks}
						renderItem={renderItem}
						keyExtractor={keyExtractor}
						ItemSeparatorComponent={FeedSeparator}
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
	header: {
		borderBottomWidth: 1,
	},
	listWrapper: {
		flex: 1,
	},
	listContainer: {
		padding: 8,
	},
	noDataContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 24,
	},
	separator: {
		height: 8,
		backgroundColor: "transparent",
	},
});

export default memo(BookmarksScreen);
