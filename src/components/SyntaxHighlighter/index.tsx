import React, { useMemo } from "react";
import {
	Text,
	TextStyle,
	View,
	useColorScheme,
	ViewStyle,
	ScrollView,
	StyleSheet,
	ToastAndroid,
} from "react-native";
import SyntaxHighlighter, {
	SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import {
	stackoverflowLight as lightStyle,
	stackoverflowDark as darkStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import transform, { StyleTuple } from "css-to-react-native";
import { IconButton, Text as PaperText } from "react-native-paper";
import Clipboard from "@react-native-clipboard/clipboard";
import { replaceNewlines } from "../../utils/string";
import { HELP_TEXT } from "../../utils/const";

type HighlighterStyleSheet = { [key: string]: TextStyle };

interface HighlighterProps extends Partial<SyntaxHighlighterProps> {
	code: string;
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
}

export const Highlighter: React.FunctionComponent<HighlighterProps> = ({
	code,
	containerStyle,
	textStyle,
	...rest
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

	const cleanStyle = (style: React.CSSProperties) => {
		const styles = Object.entries(style).map<StyleTuple>(([key, value]) => [
			key,
			value,
		]);

		return transform(styles);
	};

	const hlsStyles = useMemo(
		() => (colorScheme === "light" ? lightStyle : darkStyle),
		[colorScheme],
	);

	const stylesheet: HighlighterStyleSheet = useMemo(
		() =>
			Object.fromEntries(
				Object.entries(hlsStyles).map(([className, style]) => [
					className,
					cleanStyle(style),
				]),
			),
		[hlsStyles],
	);

	const renderNode = (nodes: rendererNode[], keyPrefix = "row") =>
		nodes.reduce<React.ReactNode[]>((acc, node, index) => {
			const keyPrefixWithIndex = `${keyPrefix}_${index}`;
			if (node.children) {
				const styles = [
					{ color: stylesheet.hljs.color, ...textStyle }, // default style for fallback
					...(node.properties?.className || [])
						.map((c) => stylesheet[c])
						.filter((c) => !!c), // fetch styles from element class name
				];
				acc.push(
					<Text style={styles} key={keyPrefixWithIndex}>
						{renderNode(node.children, `${keyPrefixWithIndex}_child`)}
					</Text>,
				);
			}

			if (node.value) {
				const value = replaceNewlines(String(node.value), "");
				acc.push(<Text key={keyPrefixWithIndex}>{value}</Text>);
			}

			return acc;
		}, []);

	const nativeRenderer = (props: rendererProps) => {
		const { rows } = props;
		return (
			<>
				<View
					style={[
						styles.header,
						{ backgroundColor: containerStyle?.backgroundColor },
					]}
				>
					<PaperText variant="labelMedium" style={styles.title}>{`${
						rest.language || "code"
					} snippet`}</PaperText>
					<IconButton
						icon="content-copy"
						size={16}
						accessibilityLabel="copy code"
						aria-label="copy code"
						onPress={onCopyCodePress}
					/>
				</View>
				<ScrollView horizontal contentContainerStyle={containerStyle}>
					<View>{renderNode(rows)}</View>
				</ScrollView>
			</>
		);
	};

	return (
		<SyntaxHighlighter
			{...rest}
			renderer={nativeRenderer}
			CodeTag={View}
			PreTag={View}
			style={{}}
		>
			{code}
		</SyntaxHighlighter>
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

export default Highlighter;
