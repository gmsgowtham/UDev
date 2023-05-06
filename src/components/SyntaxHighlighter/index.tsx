import { useMemo } from "react";
import {
	Text,
	TextStyle,
	View,
	useColorScheme,
	ViewStyle,
	ScrollView,
} from "react-native";
import SyntaxHighlighter, {
	SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import {
	tomorrow as lightStyle,
	tomorrowNight as darkStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import transform, { StyleTuple } from "css-to-react-native";
import { replaceNewlines } from "../../utils/string";

type StyleSheet = { [key: string]: TextStyle };

interface HighlighterProps extends SyntaxHighlighterProps {
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
}

export const Highlighter: React.FunctionComponent<HighlighterProps> = ({
	children,
	containerStyle,
	textStyle,
	...rest
}) => {
	const colorScheme = useColorScheme();

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

	const stylesheet: StyleSheet = useMemo(
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
			<ScrollView horizontal contentContainerStyle={containerStyle}>
				<View>{renderNode(rows)}</View>
			</ScrollView>
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
			{children}
		</SyntaxHighlighter>
	);
};

export default Highlighter;
