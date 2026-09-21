import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import {
	DefaultTheme,
	DarkTheme as NavigationDarkTheme,
	Stack,
	ThemeProvider,
} from "expo-router";
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
import { queryClient, setupQueryOnlineManager } from "../api/queryClient";
import useUserColorScheme from "../hooks/useUserColorScheme";
import { COLOR_SCHEME_VALUES } from "../mmkv/colorScheme";
import { DarkTheme, LightTheme } from "../theme";

void SplashScreen.preventAutoHideAsync();

const RootLayout: FunctionComponent = () => {
	const colorScheme = useUserColorScheme();
	const [ready, setReady] = useState(false);

	const [theme, statusBarStyle, isDark] = useMemo(() => {
		const isDark = colorScheme === COLOR_SCHEME_VALUES.Dark;
		const theme = isDark ? DarkTheme : LightTheme;
		const statusBarStyle: StatusBarStyle = isDark
			? "light-content"
			: "dark-content";
		return [theme, statusBarStyle, isDark] as const;
	}, [colorScheme]);

	// Fonts used to be bundled as native assets (android/app/src/main/assets).
	// Under Expo CNG there is no committed native project, so they must be
	// loaded at runtime instead - otherwise icons render blank and Inter
	// falls back to the system font.
	const [fontsLoaded] = useFonts({
		"Inter-Black": require("../../assets/fonts/Inter-Black.ttf"),
		"Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
		"Inter-ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
		"Inter-ExtraLight": require("../../assets/fonts/Inter-ExtraLight.ttf"),
		"Inter-Light": require("../../assets/fonts/Inter-Light.ttf"),
		"Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
		"Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
		"Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
		"Inter-Thin": require("../../assets/fonts/Inter-Thin.ttf"),
		MaterialIcons: require("react-native-vector-icons/Fonts/MaterialIcons.ttf"),
		MaterialCommunityIcons: require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
	});

	// Replicates the old `NavigationContainer theme={...}`: expo-router reads
	// its theme from `ThemeProvider`, not from PaperProvider, so without this
	// screens fall back to the default navigation theme.
	const navigationTheme = useMemo(() => {
		const base = isDark ? NavigationDarkTheme : DefaultTheme;
		return {
			...base,
			colors: {
				...base.colors,
				primary: theme.colors.primary,
				background: theme.colors.background,
				card: theme.colors.surface,
				text: theme.colors.onBackground,
				border: theme.colors.outlineVariant,
				notification: theme.colors.error,
			},
		};
	}, [isDark, theme]);

	useEffect(() => {
		setupQueryOnlineManager();
	}, []);

	useEffect(() => {
		StatusBar.setBackgroundColor(theme.colors.surface);
		StatusBar.setBarStyle(statusBarStyle);
	}, [theme, statusBarStyle]);

	const onLayoutReady = useCallback(async () => {
		if (!fontsLoaded || ready) return;
		setReady(true);
		await SplashScreen.hideAsync();
		// hack: to avoid status bar styles being mixed with splash screen
		StatusBar.setBarStyle(statusBarStyle);
		StatusBar.setBackgroundColor(theme.colors.surface);
	}, [fontsLoaded, ready, statusBarStyle, theme]);

	useEffect(() => {
		void onLayoutReady();
	}, [onLayoutReady]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<PaperProvider
			theme={theme}
			settings={{
				icon: (props) => <MaterialIcon {...props} />,
			}}
		>
			<SafeAreaProvider>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider value={navigationTheme}>
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
					</ThemeProvider>
				</QueryClientProvider>
			</SafeAreaProvider>
		</PaperProvider>
	);
};

export default RootLayout;
