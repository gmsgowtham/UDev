import axios from "axios";
import {
	API_BASE_URL,
	DEFAULT_PAGE_SIZE,
	NETWORK_TIMEOUT_MS,
} from "../utils/const";
import { buildURLParams } from "../utils/url";
import type { ArticleFeedApiStates } from "./types";

export const getArticlesList = (
	state?: ArticleFeedApiStates,
	page = 1,
	perPage = DEFAULT_PAGE_SIZE,
) => {
	const params = buildURLParams({ state, page, per_page: perPage });
	return axios.get(`${API_BASE_URL}/articles?${params}`, {
		timeout: NETWORK_TIMEOUT_MS,
	});
};

export const getVideos = (page: number, perPage: number) => {
	const params = buildURLParams({ page, per_page: perPage });
	return axios.get(`${API_BASE_URL}/videos?${params}`, {
		timeout: NETWORK_TIMEOUT_MS,
	});
};

export const getArticle = (id: number) => {
	return axios.get(`${API_BASE_URL}/articles/${id}`, {
		timeout: NETWORK_TIMEOUT_MS,
	});
};

export const searchArticles = (
	q: string,
	page = 1,
	perPage = DEFAULT_PAGE_SIZE,
) => {
	const params = buildURLParams({ q, page, per_page: perPage });
	return axios.get(`${API_BASE_URL}/articles/search?${params}`, {
		timeout: NETWORK_TIMEOUT_MS,
	});
};

export const fetchContentFromURL = (url: string) => {
	return axios.get<string>(url, {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
		},
		timeout: NETWORK_TIMEOUT_MS,
	});
};
