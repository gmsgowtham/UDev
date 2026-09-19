const { getDefaultConfig } = require("expo/metro-config");

/**
 * Metro configuration
 * https://docs.expo.dev/guides/customizing-metro/
 *
 * @type {import('expo/metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

// bundle-barrel-exports: enable experimental import support so unused
// re-exports are dropped (Expo SDK 52+ tree-shaking companion).
config.transformer.getTransformOptions = async () => ({
	transform: {
		experimentalImportSupport: true,
	},
});

module.exports = config;
