import type { FunctionComponent } from "react";
import {
	CommonActions,
	NavigationContainer,
	type Theme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LandingScreen from "../screens/Landing";
import ArticleScreen from "../screens/Article";
import type { StackParamList, TabParamList } from "./types";
import LatestScreen from "../screens/Latest";

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
						const label =
							options.tabBarLabel !== undefined &&
							typeof options.tabBarLabel === "string"
								? options.tabBarLabel
								: options.title !== undefined
								? options.title
								: route.name;
						return label;
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
				name="Trending"
				component={LandingScreen}
				options={{
					tabBarLabel: "Trending",
					tabBarIcon: ({ color, size }) => {
						return <Icon name="fire" size={size} color={color} />;
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
