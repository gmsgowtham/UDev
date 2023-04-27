import { create } from "zustand";
import {
	API_BASE_URL,
	DEFAULT_PAGE_SIZE,
	HELP_TEXT,
} from "./../../utils/const";
import { ApiArticleFeedItem, ApiArticleItem } from "./../../api/types";
import { getArticlesList } from "./../../api";
import {
	CommonState,
	setErrorState,
	setFetchingState,
	setRefreshingState,
} from "./../helpers";
import { ToastAndroid } from "react-native";
import { perfArrayConcat } from "../../utils/array";
import { processMarkdownContent } from "../../utils/markdown";

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
		fetchFeaturedArticles: () => void;
	};
	trending: ArticleFeedStateBase & {
		fetchTrendingArticles: () => void;
	};
}

export interface ArticleState {
	article?: ApiArticleItem;
	fetching: boolean;
	error: boolean;
	fetchArticle: (id: number) => void;
}

const BASE_STATE: ArticleFeedStateBase = {
	articles: [],
	loading: false,
	error: false,
	refreshing: false,
	page: 1,
};

export const useArticleFeedStore = create<ArticleFeedState>()((set, get) => ({
	latest: {
		...BASE_STATE,
		fetchLatestArticles: async (page: number = 1) => {
			const { loading, articles } = get().latest;
			if (loading) {
				return;
			}

			set((state) => ({ ...state, latest: setFetchingState(state.latest) }));

			try {
				const response = await getArticlesList(
					"fresh",
					page,
					DEFAULT_PAGE_SIZE,
				);
				const responseArticles: ApiArticleFeedItem[] = await response.json();
				set((state) => ({
					...state,
					latest: {
						...state.latest,
						...BASE_STATE,
						page,
						articles: perfArrayConcat(articles, responseArticles),
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

			set((state) => ({ ...state, latest: setRefreshingState(state.latest) }));

			try {
				const response = await getArticlesList("fresh", 1, 10);
				const articles: ApiArticleFeedItem[] = await response.json();
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
				set((state) => ({ ...state, latest: setErrorState(state.latest) }));
			}
		},
	},
	featured: {
		...BASE_STATE,
		fetchFeaturedArticles: async () => {
			set((state) => ({
				...state,
				featured: setFetchingState(state.featured),
			}));
			try {
				const response = await getArticlesList(undefined, 1, 10);
				const articles: ApiArticleFeedItem[] = await response.json();
				set((state) => ({
					...state,
					featured: {
						...state.featured,
						articles,
						fetching: false,
						error: false,
					},
				}));
			} catch (e) {
				set((state) => ({ ...state, featured: setErrorState(state.featured) }));
			}
		},
	},
	trending: {
		...BASE_STATE,
		fetchTrendingArticles: async () => {
			set((state) => ({
				...state,
				trending: setFetchingState(state.trending),
			}));
			try {
				const response = await getArticlesList("rising", 1, 10);
				const articles: ApiArticleFeedItem[] = await response.json();
				set((state) => ({
					...state,
					trending: {
						...state.trending,
						articles,
						fetching: false,
						error: false,
					},
				}));
			} catch (e) {
				set((state) => ({ ...state, trending: setErrorState(state.trending) }));
			}
		},
	},
}));

export const useArticleStore = create<ArticleState>()((set) => ({
	article: undefined,
	fetching: false,
	error: false,
	fetchArticle: async (id: number) => {
		set({ fetching: true, error: false });
		try {
			const response = await fetch(`${API_BASE_URL}/articles/${id}`);
			const article: ApiArticleItem = await response.json();

			const md = processMarkdownContent(article.body_markdown);

			set({
				fetching: false,
				error: false,
				article: {
					...article,
					body_markdown: md,
				},
			});
		} catch (e) {
			console.log("error", e);
			set({ fetching: false, error: true });
		}
	},
}));
