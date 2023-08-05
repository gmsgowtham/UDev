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
} from "react-native-paper";

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
