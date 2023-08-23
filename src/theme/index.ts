import Iris from "./colors/iris";
import {
	DarkTheme as RNDarkTheme,
	DefaultTheme as RNDefaultTheme,
} from "@react-navigation/native";
import {
	MD3DarkTheme,
	MD3LightTheme,
	MD3Theme,
	adaptNavigationTheme,
	configureFonts,
} from "react-native-paper";

import fontsConfig from "./fonts";

const { LightTheme: AdpatedLightTheme, DarkTheme: AdpatedDarkTheme } =
	adaptNavigationTheme({
		reactNavigationLight: RNDefaultTheme,
		reactNavigationDark: RNDarkTheme,
	});

export const LightTheme: MD3Theme = {
	...MD3LightTheme,
	...AdpatedLightTheme,
	colors: {
		...Iris.light,
		...AdpatedLightTheme.colors,
	},
	fonts: configureFonts({ config: fontsConfig, isV3: true }),
};

export const DarkTheme: MD3Theme = {
	...MD3DarkTheme,
	...AdpatedDarkTheme,
	colors: {
		...Iris.dark,
		...AdpatedDarkTheme.colors,
	},
	fonts: configureFonts({ config: fontsConfig, isV3: true }),
};
