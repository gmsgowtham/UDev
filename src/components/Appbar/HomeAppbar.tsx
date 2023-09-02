import { DrawerActions, useNavigation } from "@react-navigation/native";
import { FunctionComponent, memo } from "react";
import { Appbar } from "react-native-paper";

type Props = {
	mode?: "small" | "medium" | "large" | "center-aligned";
};

const HomeAppbar: FunctionComponent<Props> = ({ mode = "small" }) => {
	const navigation = useNavigation();

	const onMenuActionPress = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};

	return (
		<Appbar.Header elevated mode={mode}>
			<Appbar.Action icon={"menu"} onPress={onMenuActionPress} />
		</Appbar.Header>
	);
};

export default memo(HomeAppbar);
