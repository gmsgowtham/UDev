import { FunctionComponent, memo } from "react";
import { Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
	title: string;
	mode?: "small" | "medium" | "large" | "center-aligned";
};

const HomeAppbar: FunctionComponent<Props> = ({ title, mode = "small" }) => {
	return (
		<Appbar.Header elevated mode={mode}>
			<Appbar.Action
				icon={({ color, size }) => (
					<Icon name="menu" size={size} color={color} />
				)}
				onPress={() => {}}
			/>
			<Appbar.Content title={title} />
		</Appbar.Header>
	);
};

export default memo(HomeAppbar);