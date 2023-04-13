import React from "react";
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import LandingScreen from "../screens/landing";
import { useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Router = () => {
	const scheme = useColorScheme();
	const theme = scheme === "dark" ? DarkTheme : DefaultTheme;

	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Landing" component={LandingScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Router;
