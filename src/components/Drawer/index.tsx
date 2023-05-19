import { FunctionComponent, memo } from "react";
import { Drawer } from "react-native-paper";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const CustomDrawer: FunctionComponent<DrawerContentComponentProps> = ({
	navigation,
}) => {
	const onBookmarksItemPress = () => {
		navigation.navigate("Bookmarks");
	};

	return (
		<Drawer.Section>
			<Drawer.Item
				icon="bookmark"
				label="Bookmarks"
				onPress={onBookmarksItemPress}
			/>
		</Drawer.Section>
	);
};

export default memo(CustomDrawer);
