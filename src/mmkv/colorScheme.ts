import { logError } from "../utils/log";
import { type ColorSchemeName } from "react-native";
import { MMKV, useMMKVString } from "react-native-mmkv";

const COLOR_SCHEME_KEY = "udev_theme";
export enum COLOR_SCHEME_VALUES {
	Light = "light",
	Dark = "dark",
	System = "system",
}

export const DEFAULT_COLOR_SCHEME: ColorSchemeName = COLOR_SCHEME_VALUES.Light;

let colorSchemeStorage: MMKV;
const getColorSchemeStorage = () => {
	if (!colorSchemeStorage) {
		colorSchemeStorage = new MMKV({
			id: "udev_theme",
			encryptionKey: "THEME",
		});

		// set theme on first install
		if (!colorSchemeStorage.contains(COLOR_SCHEME_KEY)) {
			colorSchemeStorage.set(COLOR_SCHEME_KEY, COLOR_SCHEME_VALUES.System);
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
			theme ?? DEFAULT_COLOR_SCHEME,
		);
	} catch (e) {
		logError(e as Error, "fn: setTheme exception");
	}
};

export const getUserColorScheme = (): ColorSchemeName => {
	try {
		return (getColorSchemeStorage().getString(COLOR_SCHEME_KEY) ||
			DEFAULT_COLOR_SCHEME) as ColorSchemeName;
	} catch (e) {
		logError(e as Error, "fn: getTheme exception");
		return DEFAULT_COLOR_SCHEME;
	}
};
