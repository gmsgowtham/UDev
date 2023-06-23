import { MMKV, useMMKVString } from "react-native-mmkv";
import { type ColorSchemeName } from "react-native";
import { logError } from "../utils/log";

const COLOR_SCHEME_KEY = "udev_theme";
export enum THEME_VALUES {
	Light = "light",
	Dark = "dark",
	System = "system",
}

export const DEFAULT_THEME: ColorSchemeName = THEME_VALUES.Light;

let colorSchemeStorage: MMKV;
const getColorSchemeStorage = () => {
	if (!colorSchemeStorage) {
		colorSchemeStorage = new MMKV({
			id: "udev_theme",
			encryptionKey: "THEME",
		});

		// set theme on first install
		if (!colorSchemeStorage.contains(COLOR_SCHEME_KEY)) {
			colorSchemeStorage.set(COLOR_SCHEME_KEY, THEME_VALUES.System);
		}
	}

	return colorSchemeStorage;
};

export const useUserColorScheme = () => {
	return useMMKVString(COLOR_SCHEME_KEY, getColorSchemeStorage());
};

export const setUserColorScheme = (theme: ColorSchemeName) => {
	try {
		getColorSchemeStorage().set(
			COLOR_SCHEME_KEY,
			theme || getSystemColorScheme(),
		);
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
