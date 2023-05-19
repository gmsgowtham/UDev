import { FunctionComponent, memo } from "react";
import { Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerActions, useNavigation } from "@react-navigation/native";

type Props = {
	title: string;
	mode?: "small" | "medium" | "large" | "center-aligned";
};

const HomeAppbar: FunctionComponent<Props> = ({ title, mode = "small" }) => {
	const navigation = useNavigation();

	const onMenuActionPress = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};

	return (
		<Appbar.Header elevated mode={mode}>
			<Appbar.Action
				icon={({ color, size }) => (
					<Icon name="menu" size={size} color={color} />
				)}
				onPress={onMenuActionPress}
			/>
			<Appbar.Content title={title} />
		</Appbar.Header>
	);
};

export default memo(HomeAppbar);
