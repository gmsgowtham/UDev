import { createStyleBuilder } from "react-native-zephyr";
import { View, Text, SafeAreaView } from "react-native";
import FastImage from "react-native-fast-image";
import { NumOrString } from "react-native-zephyr/dist/types";

const DEFAULT_SPACING_VALUE = 4;

export const { styles, useStyles, makeStyledComponent, styled } =
	createStyleBuilder({
		extraHandlers: {
			gap: (value: NumOrString) => {
				const numberValue = parseInt(value.toString(), 10);
				const gap = numberValue * DEFAULT_SPACING_VALUE;
				return { gap };
			},
		},
	});

export const StyledView = makeStyledComponent(View);
export const StyledText = makeStyledComponent(Text);
export const StyledSafeAreaView = makeStyledComponent(SafeAreaView);
export const StyledFastImage = makeStyledComponent(FastImage);
