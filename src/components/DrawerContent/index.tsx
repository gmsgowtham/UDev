import { useRouter } from "expo-router";
import {
	type DrawerContentComponentProps,
	DrawerContentScrollView,
} from "expo-router/drawer";
import { type FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Divider, List, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ITEMS = [
	{
		path: "/bookmarks",
		title: "Bookmarks",
		icon: "bookmark-outline",
		testID: "drawer-bookmarks-content",
	},
	{
		path: "/settings",
		title: "Settings",
		icon: "settings",
		testID: "drawer-settings-content",
	},
	{
		path: "/about",
		title: "About",
		icon: "info",
		testID: "drawer-about-content",
	},
] as const;

const DrawerContent: FunctionComponent<DrawerContentComponentProps> = (
	props,
) => {
	const router = useRouter();
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={{ paddingTop: insets.top + 24 }}
		>
			<View style={styles.header}>
				<Avatar.Image
					source={require("./../../../assets/logo.png")}
					size={40}
				/>
				<Text variant="titleLarge">UDev</Text>
			</View>
			<Divider />
			<View style={styles.items}>
				{ITEMS.map((item) => (
					<List.Item
						key={item.path}
						title={item.title}
						testID={item.testID}
						onPress={() => {
							navigation.closeDrawer();
							router.push(item.path);
						}}
						left={(iconProps) => <List.Icon {...iconProps} icon={item.icon} />}
					/>
				))}
			</View>
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingHorizontal: 16,
		paddingBottom: 12,
	},
	items: {
		paddingTop: 8,
	},
});

export default memo(DrawerContent);
