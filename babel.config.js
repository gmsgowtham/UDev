module.exports = {
	presets: ["babel-preset-expo"],
	plugins: [
		[
			"react-native-worklets/plugin",
			{
				relativeSourceLocation: true,
			},
		],
		// NOTE: the old `moti/skeleton` module-resolver alias was removed.
		// moti 0.30's default `moti/skeleton` entry already renders on
		// `expo-linear-gradient`, and aliasing to the non-exported
		// `moti/skeleton/react-native-linear-gradient` subpath broke Metro's
		// package-exports resolution (warning) and risked bundling the wrong
		// copy. `react-native-linear-gradient` is therefore uninstalled.
	],
};
