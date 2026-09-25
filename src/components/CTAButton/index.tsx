import { type FunctionComponent, memo } from "react";
import { Linking, StyleSheet, View } from "react-native";
import {
	Icon,
	Surface,
	Text,
	TouchableRipple,
	useTheme,
} from "react-native-paper";

interface CTAButtonProps {
	url: string;
	text: string;
}

const CTAButton: FunctionComponent<CTAButtonProps> = ({ url, text }) => {
	const theme = useTheme();

	const onButtonPress = () => {
		Linking.openURL(url);
	};

	return (
		<Surface
			style={[styles.wrapper, { backgroundColor: theme.colors.primary }]}
			mode="flat"
		>
			<TouchableRipple
				accessibilityLabel={text}
				accessibilityRole="button"
				onPress={onButtonPress}
			>
				<View style={styles.container}>
					<Icon source="link" size={18} color={theme.colors.onPrimary} />
					<Text
						variant="labelLarge"
						style={[styles.label, { color: theme.colors.onPrimary }]}
					>
						{text}
					</Text>
				</View>
			</TouchableRipple>
		</Surface>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		marginVertical: 16,
		borderRadius: 4,
		overflow: "hidden",
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	label: {
		// Paper's Button clamps its label to a single line, which clips long
		// CTA text (and squeezes the icon). Let the label wrap instead.
		flexShrink: 1,
	},
});

export default memo(CTAButton);
