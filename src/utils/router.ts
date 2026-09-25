/**
 * Shared helpers for building expo-router navigation params.
 *
 * Route params are string-serializable only, so complex objects
 * (author, tags) are flattened when navigating. Screens re-parse them.
 */

export type ArticleRouteParams = {
	id: string;
	title: string;
	url: string;
	cover: string;
	authorName: string;
	authorImage: string;
	date: string;
	tags: string;
	organizationName?: string;
};

export type VideoRouteParams = {
	id: string;
	title: string;
	url: string;
	source: string;
	cover: string;
	authorName: string;
	duration: string;
};

type ArticleLike = {
	id: number;
	title: string;
	url: string;
	cover?: string | null;
	authorName: string;
	authorImage: string;
	date: string;
	tags: string[];
	organizationName?: string;
};

type VideoLike = {
	id: number;
	title: string;
	url: string;
	source?: string | null;
	cover?: string | null;
	authorName: string;
	duration: string;
};

export const articleRoute = (article: ArticleLike) => {
	return {
		pathname: "/article/[id]",
		params: {
			id: String(article.id),
			title: article.title,
			url: article.url,
			cover: article.cover ?? "",
			authorName: article.authorName,
			authorImage: article.authorImage,
			date: article.date,
			tags: JSON.stringify(article.tags ?? []),
			...(article.organizationName
				? { organizationName: article.organizationName }
				: {}),
		},
	} as const;
};

export const videoRoute = (video: VideoLike) => {
	return {
		pathname: "/video/[id]",
		params: {
			id: String(video.id),
			title: video.title,
			url: video.url,
			source: video.source ?? "",
			cover: video.cover ?? "",
			authorName: video.authorName,
			duration: video.duration,
		},
	} as const;
};

export const parseTagsParam = (
	tags: string | string[] | undefined,
): string[] => {
	if (!tags) return [];
	const raw = Array.isArray(tags) ? tags[0] : tags;
	try {
		const parsed: unknown = JSON.parse(raw);
		return Array.isArray(parsed)
			? parsed.filter((t): t is string => typeof t === "string")
			: [];
	} catch {
		return [];
	}
};

export const parseIdParam = (id: string | string[] | undefined): number => {
	const raw = Array.isArray(id) ? id[0] : id;
	return Number(raw ?? 0);
};

export const firstParam = (
	value: string | string[] | undefined,
	fallback = "",
): string => {
	if (Array.isArray(value)) return value[0] ?? fallback;
	return value ?? fallback;
};
