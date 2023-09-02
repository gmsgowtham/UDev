import { ApiVideoListItem } from "../../api/types";
import HomeAppbar from "../../components/Appbar/HomeAppbar";
import ListFooterLoader from "../../components/List/ListFooterLoader";
import NetworkBanner from "../../components/NetworkBanner";
import FeedSkeleton from "../../components/Skeleton/FeedSkeleton";
import VideoFeedItem from "../../components/VideoFeedItem";
import { StackParamList, TabParamList } from "../../router/types";
import useVideoFeedStore from "../../store/videos/feed";
import { DEV_TO_HOST } from "../../utils/const";
import { useNetInfo } from "@react-native-community/netinfo";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { FunctionComponent, memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

type VideosScreenProps = CompositeScreenProps<
	BottomTabScreenProps<TabParamList, "Videos">,
	NativeStackScreenProps<StackParamList>
>;

const VideosScreen: FunctionComponent<VideosScreenProps> = ({ navigation }) => {
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
	}, []);

	const onItemClick = (
		id: number,
		title: string,
		url: string,
		source: string,
		cover: string,
	) => {
		navigation.navigate("Video", { id, title, url, source, cover });
	};

	const onEndReached = () => {
		const next = page + 1;
		fetchVideos(next);
	};

	const renderItem: ListRenderItem<ApiVideoListItem> = ({ item }) => {
		return (
			<VideoFeedItem
				id={item.id}
				title={item.title}
				duration={item.video_duration_in_minutes}
				coverImageUri={item.cloudinary_video_url}
				author={{
					name: item.user.name,
				}}
				url={`${DEV_TO_HOST}${item.path}`}
				source={item.video_source_url}
				onItemClick={onItemClick}
			/>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<HomeAppbar />
			<NetworkBanner
				visible={error && !netInfo.isConnected && showNetworkBanner}
				showCloseAction
				onCloseActionPress={() => setShowNetworkBanner(false)}
			/>
			{loading && videos.length < 1 ? (
				<FeedSkeleton />
			) : (
				<View style={styles.listWrapper}>
					<FlashList
						showsVerticalScrollIndicator={false}
						data={videos}
						renderItem={renderItem}
						estimatedItemSize={377}
						refreshing={refreshing}
						onRefresh={refreshVideos}
						onEndReached={onEndReached}
						onEndReachedThreshold={0.75}
						ListFooterComponent={() => <ListFooterLoader loading={loading} />}
						contentContainerStyle={styles.listContainer}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	listWrapper: {
		flex: 1,
	},
	listContainer: {
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
});

export default memo(VideosScreen);
