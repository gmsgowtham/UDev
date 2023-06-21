import { FunctionComponent, memo } from "react";
import { View, StyleSheet } from "react-native";
import { Drawer, Text, Divider, Switch } from "react-native-paper";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import FastImage from "react-native-fast-image";
import { useUserColorScheme } from "../../mmkv/colorScheme";

const CustomDrawer: FunctionComponent<DrawerContentComponentProps> = ({
	navigation,
}) => {
	const [userColorScheme, setUserColorScheme] = useUserColorScheme();

	const onBookmarksItemPress = () => {
		navigation.navigate("Bookmarks");
	};

	const onThemeSwitchPress = () => {
		if (userColorScheme === "dark") {
			setUserColorScheme("light");
		} else {
			setUserColorScheme("dark");
		}
	};

	return (
		<>
			<View style={styles.logoContainer}>
				<FastImage
					source={require("./../../assets/icon.png")}
					style={styles.logo}
				/>
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
						icon="white-balance-sunny"
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
		width: 100,
		height: 100,
		borderRadius: 30,
	},
});

export default memo(CustomDrawer);
