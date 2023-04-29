import { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
	Latest: undefined;
	Home: undefined;
	Trending: undefined;
	Videos: undefined;
};

export type StackParamList = {
	Landing: NavigatorScreenParams<TabParamList>;
	Article: {
		id: number;
		title?: string;
	};
};
