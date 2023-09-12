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
import {
	Divider,
	IconButton,
	Surface,
	Text,
	Tooltip,
} from "react-native-paper";
import {
	monoBlue as lightStyle,
	sunburst as darkStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import useUserColorScheme from "../../hooks/useUserColorScheme";
import { COLOR_SCHEME_VALUES } from "../../mmkv/colorScheme";
import { HELP_TEXT } from "../../utils/const";

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
		<Surface
			mode="flat"
			style={[
				styles.container,
				{ backgroundColor: containerStyle?.backgroundColor },
			]}
		>
			<View style={styles.header}>
				<Text variant="labelMedium" style={styles.title}>
					{`${language} snippet`}
				</Text>
				<Tooltip title="Copy code">
					<IconButton
						icon="content-copy"
						size={16}
						accessibilityLabel="copy code"
						aria-label="copy code"
						onPress={onCopyCodePress}
					/>
				</Tooltip>
			</View>
			<Divider />
			<CodeHighlighter
				hljsStyle={hlsStyles}
				language={language}
				textStyle={textStyle}
				scrollViewProps={{
					contentContainerStyle: [containerStyle, { paddingHorizontal: 0 }],
				}}
			>
				{code}
			</CodeHighlighter>
		</Surface>
	);
};

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	container: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 16,
		overflow: "hidden",
	},
	title: {
		textTransform: "uppercase",
	},
});

export default memo(SyntaxHighlighter);
