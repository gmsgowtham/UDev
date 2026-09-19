import {
	getCrashlytics,
	recordError,
} from "@react-native-firebase/crashlytics";

export const logError = (e: Error, errorName?: string) => {
	if (__DEV__) {
		console.error(e, errorName);
	}
	recordError(getCrashlytics(), e, errorName);
};
