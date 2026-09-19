const { getDefaultConfig } = require("expo/metro-config");

/**
 * Metro configuration
 * https://docs.expo.dev/guides/customizing-metro/
 *
 * @type {import('expo/metro-config').MetroConfig}
 */
const config = {};

module.exports = getDefaultConfig(__dirname, config);
