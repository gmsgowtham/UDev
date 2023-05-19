import merge from "deepmerge";
import { FunctionComponent, useEffect } from "react";
import { StatusBar, StatusBarStyle, useColorScheme } from "react-native";
import {
	adaptNavigationTheme,
	MD3DarkTheme,
	MD3LightTheme,
	Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
	DarkTheme as RNDarkTheme,
	DefaultTheme as RNDefaultTheme,
} from "@react-navigation/native";

import Router from "./src/router";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: RNDefaultTheme,
	reactNavigationDark: RNDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
const App: FunctionComponent = () => {
	const scheme = useColorScheme();
	const theme = scheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;
	const statusBarStyle: StatusBarStyle =
		scheme === "dark" ? "light-content" : "dark-content";
	useEffect(() => {
		StatusBar.setBackgroundColor(theme.colors.elevation.level2);
		StatusBar.setBarStyle(statusBarStyle);
	}, [theme]);

	return (
		<PaperProvider theme={theme}>
			<SafeAreaProvider>
				<Router theme={theme} />
			</SafeAreaProvider>
		</PaperProvider>
	);
};

export default App;
