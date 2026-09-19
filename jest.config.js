module.exports = {
	preset: "jest-expo",
	// NOTE: same as the jest-expo preset, plus `marked`,
	// `react-native-marked` and `github-slugger`. The former two resolve
	// to TS/ESM sources (via the `react-native` field and ESM-only
	// `marked`); all three must be transformed by babel-jest instead of
	// loaded raw.
	transformIgnorePatterns: [
		"/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|standard-navigation|marked|react-native-marked|github-slugger))",
		"/node_modules/react-native-reanimated/plugin/",
		"/node_modules/@react-native/babel-preset/",
	],
};
