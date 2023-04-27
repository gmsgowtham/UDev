import { FunctionComponent, memo } from "react";
import { Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
	title: string;
	mode?: "small" | "medium" | "large" | "center-aligned";
};

const HomeAppbar: FunctionComponent<Props> = ({ title, mode }) => {
	return (
		<Appbar.Header elevated mode={mode}>
			<Appbar.Content title={title} />
			<Appbar.Action
				icon={({ color, size }) => (
					<Icon name="cog" size={size} color={color} />
				)}
				onPress={() => {}}
			/>
		</Appbar.Header>
	);
};

export default memo(HomeAppbar);
