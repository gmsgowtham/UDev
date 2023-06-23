import merge from "deepmerge";
import { FunctionComponent, useEffect, useMemo } from "react";
import {
	StatusBar,
	StatusBarStyle,
	useColorScheme,
	ColorSchemeName,
} from "react-native";
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
	THEME_VALUES,
	DEFAULT_THEME,
} from "./src/mmkv/colorScheme";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: RNDefaultTheme,
	reactNavigationDark: RNDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
const App: FunctionComponent = () => {
	const [userColorScheme] = useUserColorScheme();
	const systemColorScheme = useColorScheme();

	const [theme, statusBarStyle] = useMemo(() => {
		let scheme: ColorSchemeName;
		if (userColorScheme === THEME_VALUES.System || !userColorScheme) {
			scheme = (systemColorScheme ?? DEFAULT_THEME) as ColorSchemeName;
		} else {
			scheme = userColorScheme as ColorSchemeName;
		}

		const theme = scheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;
		const statusBarStyle =
			scheme === "dark" ? "light-content" : ("dark-content" as StatusBarStyle);
		return [theme, statusBarStyle];
	}, [userColorScheme, systemColorScheme]);

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
