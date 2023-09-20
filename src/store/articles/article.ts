import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { getArticle } from "../../api";
import { ApiArticleItem } from "../../api/types";
import { getImageSize } from "../../utils/image";
import { processMarkdownContent } from "../../utils/markdown";

export interface ArticleState {
	article?: ApiArticleItem;
	loading: boolean;
	error: boolean;
	fetchArticle: (id: number) => void;
	reset: () => void;
}

const useArticleStore = createWithEqualityFn<ArticleState>()(
	(set) => ({
		article: undefined,
		loading: false,
		error: false,
		fetchArticle: async (id: number) => {
			set({ loading: true, error: false });
			try {
				const response = await getArticle(1581071);
				const article: ApiArticleItem = await response.data;

				const coverImageSize = await getImageSize(article.cover_image);
				let aspectRatio = 0;
				if (coverImageSize.height > 0) {
					aspectRatio = coverImageSize.width / coverImageSize.height;
				}

				const md = processMarkdownContent(article.body_markdown);

				set({
					loading: false,
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
				set({ loading: false, error: true });
			}
		},
		reset: () => {
			set({
				loading: false,
				error: false,
				article: undefined,
			});
		},
	}),
	shallow,
);

export default useArticleStore;
