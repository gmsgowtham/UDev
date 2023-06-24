import React, { FunctionComponent, memo } from "react";
import { Linking, StyleProp, TextStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/src/components/Typography/types";

interface Props {
	url: string;
	children: string;
	variant?: VariantProp<string>;
	style?: StyleProp<TextStyle>;
}

const Link: FunctionComponent<Props> = ({ url, children, variant, style }) => {
	const theme = useTheme();
	const onPress = () => {
		Linking.openURL(url);
	};

	return (
		<Text
			onPress={onPress}
			variant={variant}
			style={[{ color: theme.colors.primary }, style]}
		>
			{children}
		</Text>
	);
};

export default memo(Link);
