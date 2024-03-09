import type { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
	Latest: undefined;
	Home: undefined;
	Videos: undefined;
};

export type StackParamList = {
	Landing: NavigatorScreenParams<TabParamList>;
	Article: {
		id: number;
		title: string;
		url: string;
		cover: string | null;
		author: {
			name: string;
			image: string;
		};
		date: string;
		tags: string[];
		organizationName?: string;
	};
	Bookmarks: undefined;
	Video: {
		id: number;
		title: string;
		url: string;
		source: string;
		cover: string;
		author: {
			name: string;
		};
		duration: string;
	};
	About: undefined;
	Settings: undefined;
	TermsAndConditions: undefined;
	Search: undefined;
};
