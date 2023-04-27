import { API_BASE_URL } from "../utils/const";
import { buildURLParams } from "../utils/url";
import type { ArticleFeedApiState } from "./types";

export const getArticlesList = (
	state?: ArticleFeedApiState,
	page: number = 1,
	perPage: number = 10,
) => {
	const params = buildURLParams({ state, page, per_page: perPage });
	return fetch(`${API_BASE_URL}/articles?${params}`);
};
