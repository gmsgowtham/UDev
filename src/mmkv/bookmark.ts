import { MMKV } from "react-native-mmkv";
import { logError } from "../utils/log";
import { HELP_TEXT, MAX_BOOKMARKS } from "../utils/const";

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

const bookmarkStorage = new MMKV({
	id: "udev_bookmarks",
	encryptionKey: "POST_BOOKMARKS",
});

const BOOKMARKS_KEY = "udev_bookmarks";

const saveBookmarks = (bookmarks: PostBookmarkItem[]) => {
	bookmarkStorage.set(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

const getPostIdCacheKey = (id: number): string => {
	return `${BOOKMARKS_KEY}.${id}`;
};

export const savePostToBookmarks = (
	post: PostBookmarkItem,
): BookmarkResponse => {
	try {
		// rome-ignore lint: Array mutation using push
		let bookmarks = getBookmarks();

		if (bookmarks.length === MAX_BOOKMARKS) {
			return {
				success: false,
				message: HELP_TEXT.BOOKMARK.MAX_ERR,
			};
		}

		bookmarks.push(post);
		saveBookmarks(bookmarks);
		bookmarkStorage.set(getPostIdCacheKey(post.id), true);
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
		const bookmarksStr = bookmarkStorage.getString(BOOKMARKS_KEY);
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
		return bookmarkStorage.getBoolean(getPostIdCacheKey(id)) ?? false;
	} catch (e) {
		logError(e as Error, "fn: isBookmarked exception");
		return false;
	}
};

export const removeBookmark = (id: number): boolean => {
	try {
		bookmarkStorage.delete(getPostIdCacheKey(id));
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
		return Math.max(bookmarkStorage.getAllKeys().length - 1, 0);
	} catch (e) {
		logError(e as Error, "fn: getTotalBookmarks exception");
		return 0;
	}
};

export default bookmarkStorage;
