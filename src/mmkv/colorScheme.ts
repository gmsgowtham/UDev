import { MMKV, useMMKVString } from "react-native-mmkv";
import { Appearance, type ColorSchemeName } from "react-native";
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

const getSystemColorScheme = () => {
	return Appearance.getColorScheme() || DEFAULT_THEME;
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

export const setUserColorSchemeOnSetup = () => {
	if (!getColorSchemeStorage().contains(COLOR_SCHEME_KEY)) {
		setUserColorScheme(getSystemColorScheme());
	}
};
