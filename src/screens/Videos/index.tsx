import { useNetInfo } from "@react-native-community/netinfo";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import {
	type FunctionComponent,
	memo,
	useCallback,
	useEffect,
	useState,
} from "react";
import { StyleSheet, View } from "react-native";
import type { ApiVideoListItem } from "../../api/types";
import HomeAppbar from "../../components/Appbar/HomeAppbar";
import ListFooterLoader from "../../components/List/ListFooterLoader";
import NetworkBanner from "../../components/NetworkBanner";
import FeedSkeleton from "../../components/Skeleton/FeedSkeleton";
import VideoFeedItem from "../../components/VideoFeedItem";
import useVideoFeedStore from "../../store/videos/feed";
import { DEV_TO_HOST } from "../../utils/const";
import { videoRoute } from "../../utils/router";

const FeedSeparator = () => <View style={styles.separator} />;

const keyExtractor = (item: ApiVideoListItem) => String(item.id);

const VideosScreen: FunctionComponent = () => {
	const router = useRouter();
	const [showNetworkBanner, setShowNetworkBanner] = useState(true);
	const netInfo = useNetInfo();

	const {
		videos,
		fetchVideos,
		refreshing,
		refreshVideos,
		page,
		loading,
		error,
	} = useVideoFeedStore((state) => ({
		videos: state.videos,
		fetchVideos: state.fetchVideos,
		refreshing: state.refreshing,
		refreshVideos: state.refreshVideos,
		page: state.page,
		loading: state.loading,
		error: state.error,
	}));

	useEffect(() => {
		fetchVideos(page);
	}, [page, fetchVideos]);

	const onItemClick = useCallback(
		(id: number) => {
			const video = videos.find((v) => v.id === id);
			if (!video) {
				return;
			}

			const {
				title,
				user,
				path,
				cloudinary_video_url: cover,
				video_source_url: source,
				video_duration_in_minutes: duration,
			} = video;

			router.push(
				videoRoute({
					id,
					title,
					source,
					cover,
					duration,
					url: `${DEV_TO_HOST}${path}`,
					authorName: user.name,
				}),
			);
		},
		[videos, router],
	);

	const onEndReached = useCallback(() => {
		const next = page + 1;
		fetchVideos(next);
	}, [page, fetchVideos]);

	const renderItem: ListRenderItem<ApiVideoListItem> = useCallback(
		({ item }) => {
			return (
				<VideoFeedItem
					id={item.id}
					title={item.title}
					duration={item.video_duration_in_minutes}
					coverImageUri={item.cloudinary_video_url}
					author={{
						name: item.user.name,
					}}
					onItemClick={onItemClick}
				/>
			);
		},
		[onItemClick],
	);

	const renderFooter = useCallback(
		() => <ListFooterLoader loading={loading} />,
		[loading],
	);

	const onCloseBanner = useCallback(() => setShowNetworkBanner(false), []);

	return (
		<View style={styles.container}>
			<HomeAppbar isVideoListScreen />
			<NetworkBanner
				visible={error && !netInfo.isConnected && showNetworkBanner}
				showCloseAction
				onCloseActionPress={onCloseBanner}
			/>
			{loading && videos.length < 1 ? (
				<FeedSkeleton />
			) : (
				<View style={styles.listWrapper}>
					<FlashList
						showsVerticalScrollIndicator={false}
						data={videos}
						renderItem={renderItem}
						keyExtractor={keyExtractor}
						refreshing={refreshing}
						onRefresh={refreshVideos}
						onEndReached={onEndReached}
						onEndReachedThreshold={0.75}
						ListFooterComponent={renderFooter}
						contentContainerStyle={styles.listContainer}
						ItemSeparatorComponent={FeedSeparator}
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
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	listWrapper: {
		flex: 1,
	},
	listContainer: {
		padding: 12,
	},
	separator: {
		height: 12,
		backgroundColor: "transparent",
	},
});

export default memo(VideosScreen);
