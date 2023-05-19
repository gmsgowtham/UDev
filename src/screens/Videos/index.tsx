import { FunctionComponent, memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { shallow } from "zustand/shallow";

import { CompositeScreenProps } from "@react-navigation/native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";

import { ApiVideoListItem } from "../../api/types";
import HomeAppbar from "../../components/Appbar/HomeAppbar";
import VideoFeedItem from "../../components/VideoFeedItem";
import { StackParamList, TabParamList } from "../../router/types";
import useVideoFeedStore from "../../store/videos/feed";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

interface ListFooterProps {
	loading: boolean;
}

// Todo move to common
const ListFooter = memo<ListFooterProps>(({ loading }) => {
	if (loading) {
		return (
			<View>
				<ActivityIndicator size="small" />
			</View>
		);
	}

	return null;
});

type VideosScreenProps = CompositeScreenProps<
	BottomTabScreenProps<TabParamList, "Videos">,
	StackScreenProps<StackParamList>
>;

const VideosScreen: FunctionComponent<VideosScreenProps> = () => {
	const { videos, fetchVideos, refreshing, refreshVideos, page, loading } =
		useVideoFeedStore(
			(state) => ({
				videos: state.videos,
				fetchVideos: state.fetchVideos,
				refreshing: state.refreshing,
				refreshVideos: state.refreshVideos,
				page: state.page,
				loading: state.loading,
			}),
			shallow,
		);

	useEffect(() => {
		fetchVideos(page);
	}, []);

	const onItemClick = () => {
		// navigation.navigate("Article", { id, title });
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
				onItemClick={onItemClick}
			/>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<HomeAppbar title={"Videos"} />
			{loading && videos.length < 1 ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator />
				</View>
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
						ListFooterComponent={() => <ListFooter loading={loading} />}
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
