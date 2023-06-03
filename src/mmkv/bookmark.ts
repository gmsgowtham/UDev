import { MMKV } from "react-native-mmkv";
import { logError } from "../utils/log";
import { HELP_TEXT, MAX_BOOKMARKS } from "../utils/const";
import { perfArrayConcat } from "../utils/array";

const BOOKMARKS_KEY = "udev_bookmarks";

export interface PostBookmarkItem {
	id: number;
	title: string;
	url: string;
	author: {
		name: string;
		imageUri: string;
	};
	type: string;
}

interface BookmarkResponse {
	success: boolean;
	message: string;
}

let bookmarkStorage: MMKV;
const getBookmarkStorage = () => {
	if (!bookmarkStorage) {
		bookmarkStorage = new MMKV({
			id: "udev_bookmarks",
			encryptionKey: "POST_BOOKMARKS",
		});
	}

	return bookmarkStorage;
};

const saveBookmarks = (bookmarks: PostBookmarkItem[]) => {
	getBookmarkStorage().set(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

const getPostIdCacheKey = (id: number): string => {
	return `${BOOKMARKS_KEY}.${id}`;
};

export const savePostToBookmarks = (
	post: PostBookmarkItem,
): BookmarkResponse => {
	try {
		const oldBookmarks = getBookmarks();
		if (oldBookmarks.length === MAX_BOOKMARKS) {
			return {
				success: false,
				message: HELP_TEXT.BOOKMARK.MAX_ERR,
			};
		}

		const newBookmarks = perfArrayConcat(oldBookmarks, [post]);
		saveBookmarks(newBookmarks);
		getBookmarkStorage().set(getPostIdCacheKey(post.id), true);
		return {
			success: true,
			message: HELP_TEXT.BOOKMARK.ADDED,
		};
	} catch (e) {
		logError(e as Error, "fn: savePostToBookmarks exception");
		return {
			success: false,
			message: HELP_TEXT.BOOKMARK.COMMON_ERR,
		};
	}
};

export const getBookmarks = (): PostBookmarkItem[] => {
	try {
		const bookmarksStr = getBookmarkStorage().getString(BOOKMARKS_KEY);
		if (!bookmarksStr) {
			return [];
		}

		return JSON.parse(bookmarksStr) as PostBookmarkItem[];
	} catch (e) {
		logError(e as Error, "fn: getBookmarks exception");
		return [];
	}
};

export const isBookmarked = (id: number): boolean => {
	try {
		return getBookmarkStorage().getBoolean(getPostIdCacheKey(id)) ?? false;
	} catch (e) {
		logError(e as Error, "fn: isBookmarked exception");
		return false;
	}
};

export const removeBookmark = (id: number): boolean => {
	try {
		getBookmarkStorage().delete(getPostIdCacheKey(id));
		const bookmarks = getBookmarks();
		const filtered = bookmarks.filter((item) => {
			return item.id !== id;
		});
		saveBookmarks(filtered);
		return true;
	} catch (e) {
		logError(e as Error, "fn: removeBookmark exception");
		return false;
	}
};

export const getTotalBookmarks = (): number => {
	try {
		return Math.max(getBookmarkStorage().getAllKeys().length - 1, 0);
	} catch (e) {
		logError(e as Error, "fn: getTotalBookmarks exception");
		return 0;
	}
};
