import {
	API_BASE_URL,
	DEFAULT_PAGE_SIZE,
	NETWORK_TIMEOUT_MS,
} from "../utils/const";
import { buildURLParams } from "../utils/url";
import type {
	ApiArticleFeedItem,
	ApiArticleItem,
	ApiVideoListItem,
	ArticleFeedApiStates,
} from "./types";

interface RequestOptions {
	signal?: AbortSignal;
}

const USER_AGENT =
	"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";

async function doFetch(url: string, init?: RequestInit): Promise<Response> {
	const incomingSignal = init?.signal;
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), NETWORK_TIMEOUT_MS);
	const onIncomingAbort = () => controller.abort();
	incomingSignal?.addEventListener("abort", onIncomingAbort);

	try {
		const response = await fetch(url, { ...init, signal: controller.signal });
		if (!response.ok) {
			throw new Error(
				`Request failed: ${response.status} ${response.statusText} for ${url}`,
			);
		}
		return response;
	} finally {
		clearTimeout(timeoutId);
		incomingSignal?.removeEventListener("abort", onIncomingAbort);
	}
}

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
	const response = await doFetch(url, init);
	return (await response.json()) as T;
}

async function fetchText(url: string, init?: RequestInit): Promise<string> {
	const response = await doFetch(url, init);
	return response.text();
}

export const getArticlesList = (
	state?: ArticleFeedApiStates,
	page = 1,
	perPage = DEFAULT_PAGE_SIZE,
	options?: RequestOptions,
) => {
	const params = buildURLParams({ state, page, per_page: perPage });
	return fetchJSON<ApiArticleFeedItem[]>(`${API_BASE_URL}/articles?${params}`, {
		signal: options?.signal,
	});
};

export const getVideos = (
	page: number,
	perPage: number,
	options?: RequestOptions,
) => {
	const params = buildURLParams({ page, per_page: perPage });
	return fetchJSON<ApiVideoListItem[]>(`${API_BASE_URL}/videos?${params}`, {
		signal: options?.signal,
	});
};

export const getArticle = (id: number, options?: RequestOptions) => {
	return fetchJSON<ApiArticleItem>(`${API_BASE_URL}/articles/${id}`, {
		signal: options?.signal,
	});
};

export const searchArticles = (
	q: string,
	page = 1,
	perPage = DEFAULT_PAGE_SIZE,
	options?: RequestOptions,
) => {
	const params = buildURLParams({ q, page, per_page: perPage });
	return fetchJSON<ApiArticleFeedItem[]>(
		`${API_BASE_URL}/articles/search?${params}`,
		{ signal: options?.signal },
	);
};

export const fetchContentFromURL = (url: string, options?: RequestOptions) => {
	return fetchText(url, {
		headers: {
			"User-Agent": USER_AGENT,
		},
		signal: options?.signal,
	});
};
