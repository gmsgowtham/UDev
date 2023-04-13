import { create } from "zustand";
import { API_BASE_URL } from "../utils/const";
import { ArticleListItem, ArticleItem } from "./types";

export interface ArticleListState {
	articles: ArticleListItem[];
	fetching: boolean;
	error: boolean;
	fetchArticles: () => void;
}

export interface ArticleState {
	article?: ArticleItem;
	fetching: boolean;
	error: boolean;
	fetchArticle: (id: number) => void;
}

export const useArticleListStore = create<ArticleListState>()((set) => ({
	articles: [],
	fetching: false,
	error: false,
	fetchArticles: async () => {
		set({ fetching: true, error: false });
		try {
			const response = await fetch(
				`${API_BASE_URL}/articles?state=fresh&per_page=10&page=1`,
			);
			const articles: ArticleListItem[] = await response.json();
			set({ fetching: false, articles, error: false });
		} catch (e) {
			set({ fetching: false, error: true });
		}
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
			const article: ArticleItem = await response.json();
			set({ fetching: false, article, error: false });
		} catch (e) {
			set({ fetching: false, error: true });
		}
	},
}));
