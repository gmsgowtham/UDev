import { create } from "zustand";
import { API_BASE_URL } from "./../../utils/const";
import { ApiArticleItem } from "./../../api/types";
import { processMarkdownContent } from "../../utils/markdown";
import { getImageSize } from "../../utils/image";

export interface ArticleState {
	article?: ApiArticleItem;
	fetching: boolean;
	error: boolean;
	fetchArticle: (id: number) => void;
}

const useArticleStore = create<ArticleState>()((set) => ({
	article: undefined,
	fetching: false,
	error: false,
	fetchArticle: async (id: number) => {
		set({ fetching: true, error: false });
		try {
			const response = await fetch(`${API_BASE_URL}/articles/${id}`);
			const article: ApiArticleItem = await response.json();

			const coverImageSize = await getImageSize(article.cover_image);
			let aspectRatio = 0;
			if (coverImageSize.height > 0) {
				aspectRatio = coverImageSize.width / coverImageSize.height;
			}

			const md = processMarkdownContent(article.body_markdown);

			set({
				fetching: false,
				error: false,
				article: {
					...article,
					body_markdown: md,
					cover_image_width: coverImageSize.width,
					cover_image_height: coverImageSize.height,
					cover_image_aspect_ratio: aspectRatio,
				},
			});
		} catch (e) {
			console.log("error", e);
			set({ fetching: false, error: true });
		}
	},
}));

export default useArticleStore;
