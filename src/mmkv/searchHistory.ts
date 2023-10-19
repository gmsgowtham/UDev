import { MMKV } from "react-native-mmkv";
import { perfArrayConcat } from "../utils/array";
import { logError } from "../utils/log";

const STORAGE_KEY = "search_history";
const MAX_ITEMS = 8;
let searchHistoryStorage: MMKV;

const getSearchHistoryStorage = (): MMKV => {
	if (!searchHistoryStorage) {
		searchHistoryStorage = new MMKV({
			id: STORAGE_KEY,
			encryptionKey: "SEARCH_HISTORY",
		});
	}
	return searchHistoryStorage;
};

export const getRecentSearchHistory = (): string[] => {
	try {
		const dataStr = getSearchHistoryStorage().getString(STORAGE_KEY);
		if (!dataStr) {
			return [];
		}
		return JSON.parse(dataStr) as string[];
	} catch (e) {
		logError(e as Error, "Error while fetching recent search history");
		return [];
	}
};

export const addItemToRecentSearchHistory = (item: string) => {
	if (!item.trim()) {
		return;
	}

	const newItems = perfArrayConcat([item], getRecentSearchHistory());
	const uniqueItems = [...new Set(newItems)].slice(0, MAX_ITEMS);
	try {
		getSearchHistoryStorage().set(STORAGE_KEY, JSON.stringify(uniqueItems));
	} catch (e) {
		logError(e as Error, "Error while storing recent search history");
	}
};
