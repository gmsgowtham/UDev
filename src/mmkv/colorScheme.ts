import { MMKV, useMMKVString } from "react-native-mmkv";
import { type ColorSchemeName } from "react-native";
import { logError } from "../utils/log";

const COLOR_SCHEME_KEY = "udev_theme";
const DEFAULT_THEME: ColorSchemeName = "light";

let colorSchemeStorage: MMKV;
const getColorSchemeStorage = () => {
	if (!colorSchemeStorage) {
		colorSchemeStorage = new MMKV({
			id: "udev_theme",
			encryptionKey: "THEME",
		});
	}

	return colorSchemeStorage;
};

export const useUserColorScheme = () => {
	return useMMKVString(COLOR_SCHEME_KEY);
};

export const setUserColorScheme = (theme: ColorSchemeName) => {
	try {
		getColorSchemeStorage().set(COLOR_SCHEME_KEY, theme || DEFAULT_THEME);
	} catch (e) {
		logError(e as Error, "fn: setTheme exception");
	}
};

export const getUserColorScheme = (): ColorSchemeName => {
	try {
		return (getColorSchemeStorage().getString(COLOR_SCHEME_KEY) ||
			DEFAULT_THEME) as ColorSchemeName;
	} catch (e) {
		logError(e as Error, "fn: getTheme exception");
		return DEFAULT_THEME;
	}
};
