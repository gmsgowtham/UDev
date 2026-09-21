import Url from "url-parse";
import { STACKOVERFLOW_HOST, TWITTER_URL, YOUTUBE_HOST } from "./const";

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
	const trimmed = str.trim();
	const parsed = new Url(trimmed, {});
	if (parsed.host) {
		return parsed.toString();
	}
	return `${YOUTUBE_HOST}/watch?v=${trimmed}`;
};

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export const getYoutubeVideoId = (input: string): string | null => {
	const str = input.trim();
	if (!str) return null;
	if (YOUTUBE_ID_PATTERN.test(str)) return str;

	const watchMatch = str.match(/[?&]v=([A-Za-z0-9_-]{11})/);
	if (watchMatch) return watchMatch[1];

	const pathMatch = str.match(
		/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|shorts\/|live\/|v\/))([A-Za-z0-9_-]{11})/,
	);
	if (pathMatch) return pathMatch[1];

	return null;
};

export const getYoutubeThumbnailUrl = (
	videoId: string,
	quality:
		| "default"
		| "mqdefault"
		| "hqdefault"
		| "sddefault"
		| "maxresdefault" = "hqdefault",
): string => {
	return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
};

export const getStackoverflowEmbedURL = (str: string) => {
	const parsed = new Url(str, {});
	if (parsed.host) {
		return parsed.toString();
	}
	return `${STACKOVERFLOW_HOST}/questions/${str}`;
};

export const getTweetEmbedURL = (id: string) => {
	const parsed = new Url(id, {});
	if (parsed.host) {
		return parsed.toString();
	}
	return `${TWITTER_URL}/i/web/status/${id}`;
};

export const getURLFromText = (text: string): string | null => {
	const REGEX_EMAIL = /([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
	const REGEX_LINK =
		/((http|ftp|https):\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/i;

	const textWithoutEmails = text.replace(REGEX_EMAIL, "").trim();

	if (!textWithoutEmails) return null;

	const url = textWithoutEmails.match(REGEX_LINK)?.[0];

	if (!url) return null;

	if (!url.toLowerCase().startsWith("http")) {
		return `https://${url}`;
	}

	return url;
};
