import { API_BASE_URL } from "../utils/const";
import { buildURLParams } from "../utils/url";
import type { ArticleFeedApiStates } from "./types";

export const getArticlesList = (
	state?: ArticleFeedApiStates,
	page = 1,
	perPage = 10,
) => {
	const params = buildURLParams({ state, page, per_page: perPage });
	return fetch(`${API_BASE_URL}/articles?${params}`);
};

export const getVideos = (page: number, perPage: number) => {
	const params = buildURLParams({ page, per_page: perPage });
	return fetch(`${API_BASE_URL}/videos?${params}`);
};
