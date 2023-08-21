import useUserColorScheme from "../../hooks/useUserColorScheme";
import { COLOR_SCHEME_VALUES } from "../../mmkv/colorScheme";
import { HELP_TEXT } from "../../utils/const";
import Clipboard from "@react-native-clipboard/clipboard";
import React, { FunctionComponent, memo, useMemo } from "react";
import {
	StyleSheet,
	TextStyle,
	ToastAndroid,
	View,
	ViewStyle,
} from "react-native";
import CodeHighlighter from "react-native-code-highlighter";
import { IconButton, Text } from "react-native-paper";
import {
	stackoverflowDark as darkStyle,
	stackoverflowLight as lightStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

interface HighlighterProps {
	code: string;
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
	language?: string;
}

export const SyntaxHighlighter: FunctionComponent<HighlighterProps> = ({
	code,
	containerStyle,
	textStyle,
	language,
}) => {
	const colorScheme = useUserColorScheme();

	const onCopyCodePress = () => {
		Clipboard.setString(code);
		ToastAndroid.showWithGravity(
			HELP_TEXT.CODE_COPY,
			ToastAndroid.SHORT,
			ToastAndroid.TOP,
		);
	};

	const hlsStyles = useMemo(() => {
		if (colorScheme === COLOR_SCHEME_VALUES.Light) return lightStyle;
		return darkStyle;
	}, [colorScheme]);

	return (
		<>
			<View
				style={[
					styles.header,
					{ backgroundColor: containerStyle?.backgroundColor },
				]}
			>
				<Text variant="labelMedium" style={styles.title}>
					{`${language} snippet`}
				</Text>
				<IconButton
					icon="content-copy"
					size={16}
					accessibilityLabel="copy code"
					aria-label="copy code"
					onPress={onCopyCodePress}
				/>
			</View>
			<CodeHighlighter
				hljsStyle={hlsStyles}
				language={language}
				textStyle={textStyle}
				scrollViewProps={{
					contentContainerStyle: containerStyle,
				}}
			>
				{code}
			</CodeHighlighter>
		</>
	);
};

const styles = StyleSheet.create({
	header: {
		paddingLeft: 16,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	title: {
		textTransform: "uppercase",
	},
});

export default memo(SyntaxHighlighter);
