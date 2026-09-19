export const logError = (e: Error, errorName?: string) => {
	// NOTE: console-only for now. Crashlytics was removed during the Expo
	// migration because its native config (google-services.json + gradle
	// plugin) was dropped by prebuild. To restore it, re-add
	// `@react-native-firebase/app` + `crashlytics` with their Expo config
	// plugin and a valid google-services.json (gitignored, never committed).
	console.error(e, errorName);
};
