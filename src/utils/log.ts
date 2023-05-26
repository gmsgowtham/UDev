import crashlytics from "@react-native-firebase/crashlytics";

export const logError = (e: Error, errorName?: string) => {
	crashlytics().recordError(e, errorName);
};
