import { FunctionComponent, memo } from "react";
import { Drawer, Text, Divider, Switch } from "react-native-paper";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { useUserColorScheme } from "../../mmkv/colorScheme";

const CustomDrawer: FunctionComponent<DrawerContentComponentProps> = ({
	navigation,
}) => {
	const [userColorScheme, setUserColorScheme] = useUserColorScheme();

	const onBookmarksItemPress = () => {
		navigation.navigate("Bookmarks");
	};

	const onThemeSwitchPress = () => {
		if (userColorScheme === "light") {
			setUserColorScheme("dark");
		} else {
			setUserColorScheme("light");
		}
	};

	return (
		<>
			<View style={styles.logoContainer}>
				<View style={styles.logo} />
				<Text variant="headlineMedium">UDev</Text>
			</View>
			<Divider />
			<View style={styles.itemsContainer}>
				<View>
					<Drawer.Item
						icon="bookmark"
						label="Bookmarks"
						onPress={onBookmarksItemPress}
					/>
				</View>
				<View>
					<Divider />
					<Drawer.Item
						icon="theme-light-dark"
						label="Dark Theme"
						right={() => {
							return (
								<Switch
									value={userColorScheme === "dark"}
									onValueChange={onThemeSwitchPress}
								/>
							);
						}}
					/>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	itemsContainer: {
		marginTop: 16,
		justifyContent: "space-between",
		flex: 1,
	},
	logoContainer: {
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
		paddingVertical: 16,
	},
	logo: {
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 1,
	},
});

export default memo(CustomDrawer);
