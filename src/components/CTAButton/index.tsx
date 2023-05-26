import { FunctionComponent, memo } from "react";
import { Linking } from "react-native";
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
		<Button icon={"link"} mode="contained-tonal" onPress={onButtonPress}>
			{text}
		</Button>
	);
};

export default memo(CTAButton);
