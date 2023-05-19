// TODO: capture error

import { MMKV } from "react-native-mmkv";

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

export const savePostToBookmarks = (post: PostBookmarkItem): boolean => {
	try {
		// rome-ignore lint: Array mutation using push
		let bookmarks = getBookmarks();
		bookmarks.push(post);
		saveBookmarks(bookmarks);
		bookmarkStorage.set(getPostIdCacheKey(post.id), true);
		return true;
	} catch (e) {
		return false;
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
		return [];
	}
};

export const isBookmarked = (id: number): boolean => {
	try {
		return bookmarkStorage.getBoolean(getPostIdCacheKey(id)) ?? false;
	} catch (e) {
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
		return false;
	}
};

export const getTotalBookmarks = (): number => {
	return Math.max(bookmarkStorage.getAllKeys().length - 1, 0);
};

export default bookmarkStorage;
