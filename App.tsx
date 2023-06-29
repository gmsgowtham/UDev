import useUserColorScheme from "./src/hooks/useUserColorScheme";
import { COLOR_SCHEME_VALUES } from "./src/mmkv/colorScheme";
import Router from "./src/router";
import {
	DarkTheme as RNDarkTheme,
	DefaultTheme as RNDefaultTheme,
} from "@react-navigation/native";
import { FunctionComponent, useEffect, useMemo } from "react";
import { StatusBar, StatusBarStyle } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import "react-native-gesture-handler";
import {
	MD3DarkTheme,
	MD3LightTheme,
	Provider as PaperProvider,
	adaptNavigationTheme,
} from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Iris from "./src/theme/colors/iris";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: RNDefaultTheme,
	reactNavigationDark: RNDarkTheme,
});

const CombinedDefaultTheme = {
	...MD3LightTheme,
	...LightTheme,
	colors: {
		...Iris.light,
		...LightTheme.colors,
	},
};

const CombinedDarkTheme = {
	...MD3DarkTheme,
	...DarkTheme,
	colors: {
		...Iris.dark,
		...DarkTheme.colors,
	},
};

const App: FunctionComponent = () => {
	const colorScheme = useUserColorScheme();

	const [theme, statusBarStyle] = useMemo(() => {
		const isDark = colorScheme === COLOR_SCHEME_VALUES.Dark;
		const theme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;
		const statusBarStyle = isDark
			? "light-content"
			: ("dark-content" as StatusBarStyle);
		return [theme, statusBarStyle];
	}, [colorScheme]);

	useEffect(() => {
		StatusBar.setBackgroundColor(theme.colors.elevation.level2);
		StatusBar.setBarStyle(statusBarStyle);
	}, [theme]);

	const onRouterReady = () => {
		RNBootSplash.hide();
		// hack: to avoid status bar styles being mixed with splash screen
		StatusBar.setBarStyle(statusBarStyle);
	};

	return (
		<PaperProvider theme={theme}>
			<SafeAreaProvider>
				<Router theme={theme} onReady={onRouterReady} />
			</SafeAreaProvider>
		</PaperProvider>
	);
};

export default App;
