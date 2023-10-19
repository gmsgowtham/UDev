import crashlytics from "@react-native-firebase/crashlytics";

export const logError = (e: Error, errorName?: string) => {
	if (__DEV__) {
		console.error(e, errorName);
	}
	crashlytics().recordError(e, errorName);
};
