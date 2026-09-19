import { Tabs } from "expo-router";
import type { FunctionComponent } from "react";
import { BottomNavigation, Icon } from "react-native-paper";

const TabsLayout: FunctionComponent = () => {
	return (
		<Tabs
			initialRouteName="home"
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
							navigation.navigate(route.name, route.params);
						}
					}}
					renderIcon={({ route, focused, color }) => {
						const { options } = descriptors[route.key];
						if (options.tabBarIcon) {
							return options.tabBarIcon({
								focused,
								color: String(color),
								size: 24,
							});
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
			<Tabs.Screen
				name="latest"
				options={{
					tabBarLabel: "Latest",
					tabBarIcon: ({ color, size }) => {
						return (
							<Icon source="fiber-new" size={size} color={String(color)} />
						);
					},
				}}
			/>
			<Tabs.Screen
				name="home"
				options={{
					tabBarLabel: "Featured",
					tabBarIcon: ({ color, size }) => {
						return <Icon source="home" size={size} color={String(color)} />;
					},
				}}
			/>
			<Tabs.Screen
				name="videos"
				options={{
					tabBarLabel: "Videos",
					tabBarIcon: ({ color, size }) => {
						return (
							<Icon source="video-library" size={size} color={String(color)} />
						);
					},
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
