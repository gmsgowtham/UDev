module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		[
			"react-native-reanimated/plugin",
			{
				relativeSourceLocation: true,
			},
		],
		[
			"module-resolver",
			{
				root: ["./"],
				alias: {
					"moti/skeleton": "moti/skeleton/react-native-linear-gradient",
				},
			},
		],
	],
};
