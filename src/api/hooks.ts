import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { unescape as unescapeHTML } from "html-escaper";
import { DEFAULT_PAGE_SIZE } from "../utils/const";
import { getImageSize } from "../utils/image";
import { processMarkdownContent } from "../utils/markdown";
import {
	fetchContentFromURL,
	getArticle,
	getArticlesList,
	getVideos,
	searchArticles,
} from "./index";
import { ArticleFeedApiStates } from "./types";

export const articleKeys = {
	latest: ["articles", "latest"] as const,
	featured: ["articles", "featured"] as const,
	search: (q: string) => ["articles", "search", q] as const,
	detail: (id: number) => ["article", id] as const,
};

export const videoKeys = {
	list: ["videos"] as const,
};

export const linkPreviewKeys = {
	title: (url: string) => ["link-preview", url] as const,
};

const getNextPageParam = <T>(lastPage: T[], allPages: T[][]) => {
	if (lastPage.length < DEFAULT_PAGE_SIZE) {
		return undefined;
	}
	return allPages.length + 1;
};

export function useLatestArticles() {
	return useInfiniteQuery({
		queryKey: articleKeys.latest,
		queryFn: ({ pageParam, signal }) =>
			getArticlesList(
				ArticleFeedApiStates.Fresh,
				pageParam,
				DEFAULT_PAGE_SIZE,
				{
					signal,
				},
			),
		initialPageParam: 1,
		getNextPageParam,
	});
}

export function useFeaturedArticles() {
	return useInfiniteQuery({
		queryKey: articleKeys.featured,
		queryFn: ({ pageParam, signal }) =>
			getArticlesList(undefined, pageParam, DEFAULT_PAGE_SIZE, { signal }),
		initialPageParam: 1,
		getNextPageParam,
	});
}

export function useVideos() {
	return useInfiniteQuery({
		queryKey: videoKeys.list,
		queryFn: ({ pageParam, signal }) =>
			getVideos(pageParam, DEFAULT_PAGE_SIZE, { signal }),
		initialPageParam: 1,
		getNextPageParam,
	});
}

export function useSearchArticles(query: string) {
	const q = query.trim();
	return useInfiniteQuery({
		queryKey: articleKeys.search(q),
		queryFn: ({ pageParam, signal }) =>
			searchArticles(q, pageParam, DEFAULT_PAGE_SIZE, { signal }),
		initialPageParam: 1,
		getNextPageParam,
		enabled: q.length > 0,
	});
}

export function useArticleDetail(id: number) {
	return useQuery({
		queryKey: articleKeys.detail(id),
		queryFn: async ({ signal }) => {
			const article = await getArticle(id, { signal });
			const coverImageSize = await getImageSize(article.cover_image);
			let aspectRatio = 0;
			if (coverImageSize.height > 0) {
				aspectRatio = coverImageSize.width / coverImageSize.height;
			}
			const md = processMarkdownContent(article.body_markdown);
			return {
				...article,
				body_markdown: md,
				cover_image_width: coverImageSize.width,
				cover_image_height: coverImageSize.height,
				cover_image_aspect_ratio: aspectRatio,
			};
		},
		enabled: Number.isFinite(id) && id > 0,
	});
}

export function useLinkPreviewTitle(url: string) {
	return useQuery({
		queryKey: linkPreviewKeys.title(url),
		queryFn: async ({ signal }) => {
			const html = await fetchContentFromURL(url, { signal });
			const matches = /<title>(.*?)<\/title>/is.exec(html);
			if (matches?.[1]) {
				// Titles arrive raw from the page HTML, so decode entities
				// (e.g. Fetch&#39;d) and collapse whitespace before display.
				return unescapeHTML(matches[1]).replace(/\s+/g, " ").trim();
			}
			return "External URL";
		},
		staleTime: 24 * 60 * 60 * 1000,
		gcTime: 24 * 60 * 60 * 1000,
		retry: false,
		enabled: url.length > 0,
	});
}
