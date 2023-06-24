import {
	COLOR_SCHEME_VALUES,
	DEFAULT_COLOR_SCHEME,
	useUserColorScheme,
} from "./src/mmkv/colorScheme";
import Router from "./src/router";
import {
	DarkTheme as RNDarkTheme,
	DefaultTheme as RNDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { FunctionComponent, useEffect, useMemo } from "react";
import {
	ColorSchemeName,
	StatusBar,
	StatusBarStyle,
	useColorScheme,
} from "react-native";
import {
	MD3DarkTheme,
	MD3LightTheme,
	Provider as PaperProvider,
	adaptNavigationTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
		if (userColorScheme === COLOR_SCHEME_VALUES.System || !userColorScheme) {
			scheme = (systemColorScheme ?? DEFAULT_COLOR_SCHEME) as ColorSchemeName;
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
