import { HELP_TEXT } from "../../utils/const";
import { FunctionComponent, memo, useMemo } from "react";
import { Banner } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface NetworkBannerProps {
	visible: boolean;
	showCloseAction: boolean;
	onCloseActionPress?: () => void;
}

const NetworkBanner: FunctionComponent<NetworkBannerProps> = ({
	visible,
	showCloseAction,
	onCloseActionPress = () => undefined,
}) => {
	const actions = useMemo(() => {
		if (showCloseAction) {
			return [
				{
					label: "Close",
					onPress: onCloseActionPress,
				},
			];
		}
		return [];
	}, [showCloseAction]);
	return (
		<Banner
			visible={visible}
			actions={actions}
			icon={({ size, color }) => (
				<Icon name="signal-off" size={size} color={color} />
			)}
			elevation={5}
		>
			{HELP_TEXT.NETWORK_DISCONNECTED}
		</Banner>
	);
};

export default memo(NetworkBanner);
