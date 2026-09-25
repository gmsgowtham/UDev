import { type FunctionComponent, memo } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text, useTheme } from "react-native-paper";
import { SPACING } from "../../theme/spacing";
import { HELP_TEXT } from "../../utils/const";

interface ListErrorStateProps {
	message?: string;
	onRetry: () => void;
	retrying?: boolean;
}

const ListErrorState: FunctionComponent<ListErrorStateProps> = ({
	message = HELP_TEXT.LOAD_FAILED,
	onRetry,
	retrying = false,
}) => {
	const theme = useTheme();
	return (
		<View style={styles.container}>
			<Icon
				source="signal-wifi-statusbar-connected-no-internet-4"
				size={48}
				color={theme.colors.onSurfaceVariant}
			/>
			<Text
				variant="labelLarge"
				style={[styles.message, { color: theme.colors.onSurfaceVariant }]}
			>
				{message}
			</Text>
			<Button
				mode="outlined"
				compact
				onPress={onRetry}
				loading={retrying}
				disabled={retrying}
				style={styles.button}
			>
				{HELP_TEXT.RETRY}
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: SPACING.cardPadding,
		gap: SPACING.listPadding,
	},
	message: {
		textAlign: "center",
	},
	button: {
		marginTop: SPACING.su2,
	},
});

export default memo(ListErrorState);
