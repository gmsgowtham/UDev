import { STACKOVERFLOW_HOST, YOUTUBE_HOST } from "./const";
import Url from "url-parse";

export const buildURLParams = (
	params: Record<string, string | number | boolean | undefined | null>,
): string => {
	let paramsArray: string[] = [];
	for (const property in params) {
		const value = params[property];
		if (typeof value === "undefined" || value === null) {
			continue;
		}

		paramsArray = [...paramsArray, `${property}=${value}`];
	}

	return paramsArray.join("&");
};

export const getYoutubeEmbedURL = (str: string) => {
	const parsed = new Url(str, {});
	if (parsed.host) {
		return parsed.toString();
	}
	return `${YOUTUBE_HOST}/watch?v=${str}`;
};

export const getStackoverflowEmbedURL = (str: string) => {
	const parsed = new Url(str, {});
	if (parsed.host) {
		return parsed.toString();
	}
	return `${STACKOVERFLOW_HOST}/questions/${str}`;
};
