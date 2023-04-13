import { useColorScheme } from "react-native";
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/landing";
import ArticleScreen from "../screens/article";
import { StackParamList } from "./types";

const Router = () => {
	const scheme = useColorScheme();
	const theme = scheme === "dark" ? DarkTheme : DefaultTheme;

	const Stack = createNativeStackNavigator<StackParamList>();

	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="Landing"
			>
				<Stack.Screen name="Landing" component={LandingScreen} />
				<Stack.Screen name="Article" component={ArticleScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Router;
