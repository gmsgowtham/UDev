import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FunctionComponent, memo, useState } from "react";
import { Appbar, Avatar, Menu, Tooltip, useTheme } from "react-native-paper";
import { StackParamList } from "../../router/types";

const HomeAppbar: FunctionComponent = () => {
	const navigation = useNavigation<NavigationProp<StackParamList>>();
	const theme = useTheme();

	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const onBookmarksItemPress = () => {
		navigation.navigate("Bookmarks");
	};

	const onSearchItemPress = () => {
		navigation.navigate("Search");
	};

	const onAboutItemPress = () => {
		closeMenu();
		navigation.navigate("About");
	};

	const onSettingItemPress = () => {
		closeMenu();
		navigation.navigate("Settings");
	};

	return (
		<Appbar.Header elevated>
			<Appbar.Action
				animated={false}
				icon={({ size }) => (
					<Avatar.Image
						source={require("./../../../assets/logo.png")}
						size={size}
					/>
				)}
			/>
			<Appbar.Content title="" />
			<Tooltip title="Search posts">
				<Appbar.Action
					animated={false}
					icon="search"
					onPress={onSearchItemPress}
				/>
			</Tooltip>
			<Tooltip title="Show Bookmarks">
				<Appbar.Action
					animated={false}
					icon="bookmark-outline"
					onPress={onBookmarksItemPress}
				/>
			</Tooltip>

			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchorPosition="bottom"
				anchor={
					<Tooltip title="More options">
						<Appbar.Action icon="more-vert" onPress={openMenu} />
					</Tooltip>
				}
			>
				<Menu.Item
					leadingIcon="info"
					onPress={onAboutItemPress}
					title="About"
				/>
				<Menu.Item
					leadingIcon="settings"
					onPress={onSettingItemPress}
					title="Settings"
				/>
			</Menu>
		</Appbar.Header>
	);
};

export default memo(HomeAppbar);
