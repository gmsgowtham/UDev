import React, { memo, useMemo, FunctionComponent } from "react";
import {
	TextStyle,
	View,
	useColorScheme,
	ViewStyle,
	StyleSheet,
	ToastAndroid,
} from "react-native";
import CodeHighlighter from "react-native-code-highlighter";
import {
	stackoverflowLight as lightStyle,
	stackoverflowDark as darkStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { IconButton, Text as PaperText } from "react-native-paper";
import Clipboard from "@react-native-clipboard/clipboard";
import { HELP_TEXT } from "../../utils/const";

interface HighlighterProps {
	code: string;
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
	language?: string;
}

export const Highlighter: FunctionComponent<HighlighterProps> = ({
	code,
	containerStyle,
	textStyle,
	language,
}) => {
	const colorScheme = useColorScheme();

	const onCopyCodePress = () => {
		Clipboard.setString(code);
		ToastAndroid.showWithGravity(
			HELP_TEXT.CODE_COPY,
			ToastAndroid.SHORT,
			ToastAndroid.TOP,
		);
	};

	const hlsStyles = useMemo(
		() => (colorScheme === "light" ? lightStyle : darkStyle),
		[colorScheme],
	);

	return (
		<>
			<View
				style={[
					styles.header,
					{ backgroundColor: containerStyle?.backgroundColor },
				]}
			>
				<PaperText variant="labelMedium" style={styles.title}>{`${
					language || "code"
				} snippet`}</PaperText>
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
				containerStyle={containerStyle}
				textStyle={textStyle}
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

export default memo(Highlighter);
