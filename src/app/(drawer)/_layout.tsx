import { Drawer } from "expo-router/drawer";
import type { FunctionComponent } from "react";
import { useTheme } from "react-native-paper";
import DrawerContent from "../../components/DrawerContent";

const DrawerLayout: FunctionComponent = () => {
	const theme = useTheme();
	return (
		<Drawer
			screenOptions={{
				headerShown: false,
				swipeEnabled: true,
				drawerStyle: {
					width: 300,
					backgroundColor: theme.colors.surface,
				},
			}}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen name="(tabs)" options={{ title: "Home" }} />
		</Drawer>
	);
};

export default DrawerLayout;
