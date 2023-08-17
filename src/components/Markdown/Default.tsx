import renderer from "./renderer";
import getMarkdownTheme from "./theme";
import tokenizer from "./tokenizer";
import {
	FunctionComponent,
	ReactNode,
	memo,
	useCallback,
	useMemo,
} from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useMarkdown } from "react-native-marked";
import { ActivityIndicator, useTheme } from "react-native-paper";

interface MarkdownRendererProps {
	loadingState?: boolean;
	value?: string;
	headerComponent?: () => React.JSX.Element | null;
	loadingPlaceholder?: ReactNode;
}

const RenderMarkdownDefault: FunctionComponent<MarkdownRendererProps> = ({
	value = "",
	loadingState = false,
	headerComponent,
	loadingPlaceholder,
}) => {
	const theme = useTheme();

	const renderItem = useCallback(({ item }: { item: ReactNode }) => {
		return <View style={styles.item}>{item}</View>;
	}, []);

	const keyExtractor = useCallback(
		(_: ReactNode, index: number) => index.toString(),
		[],
	);

	const markdownTheme = useMemo(() => {
		return getMarkdownTheme(theme);
	}, [theme]);

	const rnElements = useMarkdown(value, {
		renderer: renderer,
		theme: markdownTheme,
		tokenizer: tokenizer,
	});

	const elements: ReactNode[] = useMemo(() => {
		if (loadingState && loadingPlaceholder) {
			return [loadingPlaceholder];
		} else if (loadingState && !loadingPlaceholder) {
			return [<ActivityIndicator />];
		}

		return rnElements;
	}, [loadingState]);

	return (
		<FlatList
			removeClippedSubviews={false}
			keyExtractor={keyExtractor}
			maxToRenderPerBatch={8}
			initialNumToRender={8}
			style={{
				backgroundColor: theme.colors.background,
			}}
			data={elements}
			renderItem={renderItem}
			contentContainerStyle={styles.container}
			ListHeaderComponent={headerComponent}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingBottom: 24,
	},
	item: {
		paddingHorizontal: 12,
	},
});

export default memo(RenderMarkdownDefault);
