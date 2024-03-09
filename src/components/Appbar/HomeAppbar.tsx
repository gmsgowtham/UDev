import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { Fragment, type FunctionComponent, memo, useState } from "react";
import { Appbar, Avatar, Menu, Tooltip } from "react-native-paper";
import type { StackParamList } from "../../router/types";

type props = {
	isVideoListScreen?: boolean;
};

const HomeAppbar: FunctionComponent<props> = ({
	isVideoListScreen = false,
}) => {
	const navigation = useNavigation<NavigationProp<StackParamList>>();

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
			<Appbar.Content title="UDev" />
			{!isVideoListScreen ? (
				<Fragment>
					<Tooltip title="Search posts">
						<Appbar.Action
							animated={false}
							icon="search"
							onPress={onSearchItemPress}
						/>
					</Tooltip>
				</Fragment>
			) : null}

			<Tooltip title="Show Bookmarks">
				<Appbar.Action
					animated={false}
					icon="bookmark-outline"
					onPress={onBookmarksItemPress}
				/>
			</Tooltip>

			<Tooltip title="Settings">
				<Appbar.Action
					animated={false}
					icon="settings"
					onPress={onSettingItemPress}
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
			</Menu>
		</Appbar.Header>
	);
};

export default memo(HomeAppbar);
