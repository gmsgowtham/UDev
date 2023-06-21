import merge from "deepmerge";
import { FunctionComponent, useEffect } from "react";
import { StatusBar, StatusBarStyle } from "react-native";
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
import {
	useUserColorScheme,
	setUserColorSchemeOnSetup,
} from "./src/mmkv/colorScheme";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: RNDefaultTheme,
	reactNavigationDark: RNDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
const App: FunctionComponent = () => {
	useEffect(() => {
		// TODO: avoid re-render on first install
		setUserColorSchemeOnSetup();
	}, []);

	const [userColorScheme] = useUserColorScheme();

	// TODO: possible memoization for theme
	const theme =
		userColorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;
	const statusBarStyle: StatusBarStyle =
		userColorScheme === "dark" ? "light-content" : "dark-content";

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
