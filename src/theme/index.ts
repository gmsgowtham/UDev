import Iris from "./colors/iris";
import {
	DarkTheme as RNDarkTheme,
	DefaultTheme as RNDefaultTheme,
} from "@react-navigation/native";
import {
	MD3DarkTheme,
	MD3LightTheme,
	adaptNavigationTheme,
} from "react-native-paper";
import { MD3Theme } from "react-native-paper/lib/typescript/src/types";

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
};

export const DarkTheme: MD3Theme = {
	...MD3DarkTheme,
	...AdpatedDarkTheme,
	colors: {
		...Iris.dark,
		...AdpatedDarkTheme.colors,
	},
};
