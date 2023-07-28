import { getVideos } from "../../api";
import { ApiVideoListItem } from "../../api/types";
import { perfArrayConcat } from "../../utils/array";
import { DEFAULT_PAGE_SIZE, HELP_TEXT } from "../../utils/const";
import {
	CommonState,
	setErrorState,
	setFetchingState,
	setRefreshingState,
} from "../helpers";
import { ToastAndroid } from "react-native";
import { create } from "zustand";

export interface VideoFeedState extends CommonState {
	videos: ApiVideoListItem[];
	page: number;
	fetchVideos: (page?: number) => void;
	refreshVideos: () => void;
}

const BASE_STATE: Omit<VideoFeedState, "fetchVideos" | "refreshVideos"> = {
	videos: [],
	loading: false,
	error: false,
	refreshing: false,
	page: 1,
};

const useVideoFeedStore = create<VideoFeedState>()((set, get) => ({
	...BASE_STATE,
	videos: [],
	loading: false,
	error: false,
	refreshing: false,
	page: 1,
	fetchVideos: async (page = 1) => {
		const { loading, videos } = get();
		if (loading) {
			return;
		}

		set((state) => ({ ...state, ...setFetchingState(state) }));

		try {
			const response = await getVideos(page, DEFAULT_PAGE_SIZE);
			const responseVideos: ApiVideoListItem[] = await response.data;
			set((state) => ({
				...state,
				...BASE_STATE,
				page,
				videos: perfArrayConcat(videos, responseVideos),
			}));
		} catch (e) {
			set((state) => ({ ...state, ...setErrorState(state) }));
		}
	},
	refreshVideos: async () => {
		if (get().refreshing) {
			return;
		}

		set((state) => ({ ...state, ...setRefreshingState(state) }));

		try {
			const response = await getVideos(1, 10);
			const videos: ApiVideoListItem[] = await response.data;
			set((state) => ({
				...state,
				...BASE_STATE,
				videos,
			}));
			ToastAndroid.showWithGravity(
				HELP_TEXT.FEED_REFRESHED,
				ToastAndroid.SHORT,
				ToastAndroid.TOP,
			);
		} catch (e) {
			set((state) => ({ ...state, ...setErrorState(state) }));
		}
	},
}));

export default useVideoFeedStore;
