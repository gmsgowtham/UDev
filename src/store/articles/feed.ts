import { ToastAndroid } from "react-native";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/vanilla/shallow";
import { getArticlesList, searchArticles } from "../../api";
import { type ApiArticleFeedItem, ArticleFeedApiStates } from "../../api/types";
import { perfArrayConcat } from "../../utils/array";
import { DEFAULT_PAGE_SIZE, HELP_TEXT } from "../../utils/const";
import {
	type CommonState,
	setErrorState,
	setFetchingState,
	setRefreshingState,
} from "../helpers";

export interface ArticleFeedStateBase extends CommonState {
	articles: ApiArticleFeedItem[];
	page: number;
}

export interface ArticleFeedState {
	latest: ArticleFeedStateBase & {
		fetchLatestArticles: (page?: number) => void;
		refreshLatestArticles: () => void;
	};
	featured: ArticleFeedStateBase & {
		fetchFeaturedArticles: (page?: number) => void;
		refreshFeaturedArticles: () => void;
	};
	search: ArticleFeedStateBase & {
		searchArticles: (q: string, page?: number) => void;
		refreshSearch: (q: string) => void;
		reset: () => void;
	};
}

const BASE_STATE: ArticleFeedStateBase = {
	articles: [],
	loading: false,
	error: false,
	refreshing: false,
	page: 1,
};

// TODO: reuse common behavior
const useArticleFeedStore = createWithEqualityFn<ArticleFeedState>()(
	(set, get) => ({
		latest: {
			...BASE_STATE,
			fetchLatestArticles: async (page = 1) => {
				const { loading, articles: oldArticles } = get().latest;
				if (loading) {
					return;
				}

				set((state) => ({ ...state, latest: setFetchingState(state.latest) }));

				try {
					const response = await getArticlesList(
						ArticleFeedApiStates.Fresh,
						page,
						DEFAULT_PAGE_SIZE,
					);
					const responseArticles: ApiArticleFeedItem[] = await response.data;
					let articles = responseArticles;
					if (page > 1) {
						articles = perfArrayConcat(oldArticles, responseArticles);
					}
					set((state) => ({
						...state,
						latest: {
							...state.latest,
							...BASE_STATE,
							page,
							articles,
						},
					}));
				} catch (e) {
					set((state) => ({ ...state, latest: setErrorState(state.latest) }));
				}
			},
			refreshLatestArticles: async () => {
				if (get().latest.refreshing) {
					return;
				}

				set((state) => ({
					...state,
					latest: setRefreshingState(state.latest),
				}));

				try {
					const response = await getArticlesList(
						ArticleFeedApiStates.Fresh,
						1,
						10,
					);

					const articles: ApiArticleFeedItem[] = await response.data;
					set((state) => ({
						...state,
						latest: { ...state.latest, ...BASE_STATE, articles },
					}));
					ToastAndroid.showWithGravity(
						HELP_TEXT.FEED_REFRESHED,
						ToastAndroid.SHORT,
						ToastAndroid.TOP,
					);
				} catch (e) {
					console.log("err", e);
					set((state) => ({ ...state, latest: setErrorState(state.latest) }));
				}
			},
		},
		featured: {
			...BASE_STATE,
			fetchFeaturedArticles: async (page = 1) => {
				const { loading, articles: oldArticles } = get().featured;
				if (loading) {
					return;
				}

				set((state) => ({
					...state,
					featured: setFetchingState(state.featured),
				}));

				try {
					const response = await getArticlesList(
						undefined,
						page,
						DEFAULT_PAGE_SIZE,
					);
					const responseArticles: ApiArticleFeedItem[] = await response.data;
					let articles = responseArticles;
					if (page > 1) {
						articles = perfArrayConcat(oldArticles, responseArticles);
					}

					set((state) => ({
						...state,
						featured: {
							...state.featured,
							...BASE_STATE,
							page,
							articles: articles,
						},
					}));
				} catch (e) {
					set((state) => ({
						...state,
						featured: setErrorState(state.featured),
					}));
				}
			},
			refreshFeaturedArticles: async () => {
				if (get().featured.refreshing) {
					return;
				}

				set((state) => ({
					...state,
					featured: setRefreshingState(state.featured),
				}));

				try {
					const response = await getArticlesList(undefined, 1, 10);
					const articles: ApiArticleFeedItem[] = await response.data;
					set((state) => ({
						...state,
						featured: { ...state.featured, ...BASE_STATE, articles },
					}));
					ToastAndroid.showWithGravity(
						HELP_TEXT.FEED_REFRESHED,
						ToastAndroid.SHORT,
						ToastAndroid.TOP,
					);
				} catch (e) {
					set((state) => ({
						...state,
						featured: setErrorState(state.featured),
					}));
				}
			},
		},
		search: {
			...BASE_STATE,
			searchArticles: async (q: string, page = 1) => {
				const { loading, articles: oldArticles } = get().search;
				if (loading) {
					return;
				}

				set((state) => ({
					...state,
					search: setFetchingState(state.search),
				}));

				try {
					const response = await searchArticles(q, page, DEFAULT_PAGE_SIZE);

					const responseArticles: ApiArticleFeedItem[] = await response.data;

					let articles = responseArticles;
					if (page > 1) {
						articles = perfArrayConcat(oldArticles, responseArticles);
					}

					set((state) => ({
						...state,
						search: {
							...state.search,
							...BASE_STATE,
							page,
							articles,
						},
					}));
				} catch (e) {
					set((state) => ({
						...state,
						search: setErrorState(state.search),
					}));
				}
			},
			refreshSearch: async (q: string) => {
				if (get().search.refreshing) {
					return;
				}

				set((state) => ({
					...state,
					search: setRefreshingState(state.search),
				}));

				try {
					const response = await searchArticles(q, 1, 10);
					const articles: ApiArticleFeedItem[] = await response.data;
					set((state) => ({
						...state,
						search: { ...state.search, ...BASE_STATE, articles },
					}));
					ToastAndroid.showWithGravity(
						HELP_TEXT.FEED_REFRESHED,
						ToastAndroid.SHORT,
						ToastAndroid.TOP,
					);
				} catch (e) {
					set((state) => ({
						...state,
						search: setErrorState(state.search),
					}));
				}
			},

			reset: async () => {
				set((state) => ({
					...state,
					search: {
						...state.search,
						loading: false,
						error: false,
						articles: [],
					},
				}));
			},
		},
	}),
	shallow,
);

export default useArticleFeedStore;
