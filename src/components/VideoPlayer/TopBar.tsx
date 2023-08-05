import { FunctionComponent, memo } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Appbar, MD3Theme, Tooltip } from "react-native-paper";

interface TopBarProps {
	theme: MD3Theme;
	onBackActionPress: () => void;
	onShareActionPress: () => void;
	onOpenInBrowserActionPress: () => void;
}

const TopBar: FunctionComponent<TopBarProps> = ({
	theme,
	onBackActionPress,
	onShareActionPress,
	onOpenInBrowserActionPress,
}) => (
	<View>
		<Appbar.Header theme={theme} style={styles.appbar}>
			<Appbar.BackAction onPress={onBackActionPress} />
			<Appbar.Content title="" />
			<Tooltip title="Share">
				<Appbar.Action
					icon="share"
					onPress={onShareActionPress}
					accessibilityHint="Share video"
					accessibilityLabel="Share video"
					theme={theme}
				/>
			</Tooltip>
			<Tooltip title="Open in browser">
				<Appbar.Action
					icon="launch"
					onPress={onOpenInBrowserActionPress}
					accessibilityHint="Open in browser"
					accessibilityLabel="Open in browser"
					theme={theme}
				/>
			</Tooltip>
		</Appbar.Header>
	</View>
);

const styles = StyleSheet.create({
	appbar: {
		backgroundColor: "transparent",
	},
});

export default memo(TopBar);
