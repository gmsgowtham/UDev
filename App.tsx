import useUserColorScheme from "./src/hooks/useUserColorScheme";
import { COLOR_SCHEME_VALUES } from "./src/mmkv/colorScheme";
import Router from "./src/router";
import { DarkTheme, LightTheme } from "./src/theme";
import { Theme } from "@react-navigation/native";
import { FunctionComponent, useEffect, useMemo } from "react";
import { StatusBar, StatusBarStyle } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App: FunctionComponent = () => {
	const colorScheme = useUserColorScheme();

	const [theme, statusBarStyle] = useMemo(() => {
		const isDark = colorScheme === COLOR_SCHEME_VALUES.Dark;
		const theme = isDark ? DarkTheme : LightTheme;
		const statusBarStyle: StatusBarStyle = isDark
			? "light-content"
			: "dark-content";
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
		StatusBar.setBackgroundColor(theme.colors.elevation.level2);
	};

	return (
		<PaperProvider theme={theme}>
			<SafeAreaProvider>
				<Router theme={theme as unknown as Theme} onReady={onRouterReady} />
			</SafeAreaProvider>
		</PaperProvider>
	);
};

export default App;
