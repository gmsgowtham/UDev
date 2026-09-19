import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
	type FunctionComponent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { StatusBar, type StatusBarStyle } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import useUserColorScheme from "../hooks/useUserColorScheme";
import { COLOR_SCHEME_VALUES } from "../mmkv/colorScheme";
import { DarkTheme, LightTheme } from "../theme";

void SplashScreen.preventAutoHideAsync();

const RootLayout: FunctionComponent = () => {
	const colorScheme = useUserColorScheme();
	const [ready, setReady] = useState(false);

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
	}, [theme, statusBarStyle]);

	const onLayoutReady = useCallback(async () => {
		if (ready) return;
		setReady(true);
		await SplashScreen.hideAsync();
		// hack: to avoid status bar styles being mixed with splash screen
		StatusBar.setBarStyle(statusBarStyle);
		StatusBar.setBackgroundColor(theme.colors.elevation.level2);
	}, [ready, statusBarStyle, theme]);

	useEffect(() => {
		void onLayoutReady();
	}, [onLayoutReady]);

	return (
		<PaperProvider
			theme={theme}
			settings={{
				icon: (props) => <MaterialIcon {...props} />,
			}}
		>
			<SafeAreaProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(tabs)" />
					<Stack.Screen name="article/[id]" />
					<Stack.Screen name="video/[id]" />
					<Stack.Screen name="bookmarks" />
					<Stack.Screen name="search" />
					<Stack.Screen name="settings" />
					<Stack.Screen name="about" />
					<Stack.Screen name="terms" />
				</Stack>
			</SafeAreaProvider>
		</PaperProvider>
	);
};

export default RootLayout;
