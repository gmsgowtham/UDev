import { FunctionComponent, memo, useMemo } from "react";
import { Banner, Icon } from "react-native-paper";
import { HELP_TEXT } from "../../utils/const";

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
				<Icon
					source="signal-wifi-statusbar-connected-no-internet-4"
					size={size}
					color={color}
				/>
			)}
			elevation={5}
		>
			{HELP_TEXT.NETWORK_DISCONNECTED}
		</Banner>
	);
};

export default memo(NetworkBanner);
