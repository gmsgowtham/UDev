import { FunctionComponent, memo } from "react";
import { Drawer, Text, Divider } from "react-native-paper";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";

const CustomDrawer: FunctionComponent<DrawerContentComponentProps> = ({
	navigation,
}) => {
	const onBookmarksItemPress = () => {
		navigation.navigate("Bookmarks");
	};

	return (
		<View>
			<View style={styles.logoContainer}>
				<View style={styles.logo} />
				<Text variant="headlineMedium">UDev</Text>
			</View>
			<Divider />
			<View style={styles.itemsContainer}>
				<Drawer.Item
					icon="bookmark"
					label="Bookmarks"
					onPress={onBookmarksItemPress}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	itemsContainer: {
		marginVertical: 16,
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
