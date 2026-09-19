import { useRouter } from "expo-router";
import { Fragment, type FunctionComponent, memo, useState } from "react";
import { Appbar, Avatar, Menu, Tooltip } from "react-native-paper";

type props = {
	isVideoListScreen?: boolean;
};

const HomeAppbar: FunctionComponent<props> = ({
	isVideoListScreen = false,
}) => {
	const router = useRouter();

	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const onBookmarksItemPress = () => {
		router.push("/bookmarks");
	};

	const onSearchItemPress = () => {
		router.push("/search");
	};

	const onAboutItemPress = () => {
		closeMenu();
		router.push("/about");
	};

	const onSettingItemPress = () => {
		closeMenu();
		router.push("/settings");
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
