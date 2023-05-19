import type { FunctionComponent } from "react";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	CommonActions,
	NavigationContainer,
	Theme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ArticleScreen from "../screens/Article";
import LandingScreen from "../screens/Landing";
import LatestScreen from "../screens/LatestFeed";
import VideosScreen from "../screens/Videos";

import type { StackParamList, TabParamList } from "./types";
type RouterProps = {
	theme: Theme;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<StackParamList>();

const BottomTabs = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
			}}
			tabBar={({ navigation, state, descriptors, insets }) => (
				<BottomNavigation.Bar
					shifting
					navigationState={state}
					safeAreaInsets={insets}
					onTabPress={({ route, preventDefault }) => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (event.defaultPrevented) {
							preventDefault();
						} else {
							navigation.dispatch({
								...CommonActions.navigate(route.name, route.params),
								target: state.key,
							});
						}
					}}
					renderIcon={({ route, focused, color }) => {
						const { options } = descriptors[route.key];
						if (options.tabBarIcon) {
							return options.tabBarIcon({ focused, color, size: 24 });
						}
						return null;
					}}
					getLabelText={({ route }) => {
						const { options } = descriptors[route.key];
						return options.tabBarLabel !== undefined &&
							typeof options.tabBarLabel === "string"
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name;
					}}
				/>
			)}
		>
			<Tab.Screen
				name="Latest"
				component={LatestScreen}
				options={{
					tabBarLabel: "Latest",
					tabBarIcon: ({ color, size }) => {
						return <Icon name="new-box" size={size} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name="Home"
				component={LandingScreen}
				options={{
					tabBarLabel: "Featured",
					tabBarIcon: ({ color, size }) => {
						return <Icon name="home" size={size} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name="Videos"
				component={VideosScreen}
				options={{
					tabBarLabel: "Videos",
					tabBarIcon: ({ color, size }) => {
						return <Icon name="video-box" size={size} color={color} />;
					},
				}}
			/>
		</Tab.Navigator>
	);
};

const Router: FunctionComponent<RouterProps> = ({ theme }) => {
	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="Landing"
			>
				<Stack.Screen name="Landing" component={BottomTabs} />
				<Stack.Screen name="Article" component={ArticleScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Router;
