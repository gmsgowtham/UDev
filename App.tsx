import { useEffect } from "react";
import { StatusBar, StatusBarStyle, useColorScheme } from "react-native";
import {
	Provider as PaperProvider,
	MD3LightTheme,
	MD3DarkTheme,
	adaptNavigationTheme,
} from "react-native-paper";
import {
	DarkTheme as RNDarkTheme,
	DefaultTheme as RNDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import Router from "./src/router";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: RNDefaultTheme,
	reactNavigationDark: RNDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const App = (): JSX.Element => {
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
			<Router theme={theme} />
		</PaperProvider>
	);
};

export default App;
