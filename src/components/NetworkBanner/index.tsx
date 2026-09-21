import { type FunctionComponent, memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Banner, Icon, useTheme } from "react-native-paper";
import { RADIUS } from "../../theme/spacing";
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
	}, [showCloseAction, onCloseActionPress]);
	const theme = useTheme();
	return (
		<Banner
			visible={visible}
			actions={actions}
			style={[
				styles.banner,
				{
					backgroundColor: theme.colors.surface,
					borderColor: theme.colors.outline,
				},
			]}
			icon={({ size, color }) => (
				<Icon
					source="signal-wifi-statusbar-connected-no-internet-4"
					size={size}
					color={color}
				/>
			)}
			elevation={0}
		>
			{HELP_TEXT.NETWORK_DISCONNECTED}
		</Banner>
	);
};

const styles = StyleSheet.create({
	banner: {
		borderWidth: 1,
		borderRadius: RADIUS.small,
	},
});

export default memo(NetworkBanner);
