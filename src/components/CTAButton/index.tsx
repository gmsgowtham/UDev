import { type FunctionComponent, memo } from "react";
import { Linking, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface CTAButtonProps {
	url: string;
	text: string;
}

const CTAButton: FunctionComponent<CTAButtonProps> = ({ url, text }) => {
	const onButtonPress = () => {
		Linking.openURL(url);
	};

	return (
		<Button
			style={styles.button}
			icon={"link"}
			mode="elevated"
			compact
			onPress={onButtonPress}
		>
			{text}
		</Button>
	);
};

const styles = StyleSheet.create({
	button: {
		marginVertical: 16,
	},
});

export default memo(CTAButton);
