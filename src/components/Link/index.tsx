import React, { type FunctionComponent, memo } from "react";
import { Linking, type StyleProp, type TextStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";
import type { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

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
