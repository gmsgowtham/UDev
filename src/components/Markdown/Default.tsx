import {
	type FunctionComponent,
	type ReactNode,
	memo,
	useCallback,
	useMemo,
} from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useMarkdown, type useMarkdownHookOptions } from "react-native-marked";
import { ActivityIndicator, useTheme } from "react-native-paper";
import renderer from "./renderer";
import getMarkdownStyles from "./styles";
import getMarkdownTheme from "./theme";
import tokenizer from "./tokenizer";

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

	const options: useMarkdownHookOptions = useMemo(() => {
		return {
			renderer: renderer,
			tokenizer: tokenizer,
			theme: getMarkdownTheme(theme),
			styles: getMarkdownStyles(theme),
		};
	}, [theme]);

	const rnElements = useMarkdown(value, options);

	const elements: ReactNode[] = useMemo(() => {
		if (loadingState && loadingPlaceholder) {
			return [loadingPlaceholder];
		}
		if (loadingState && !loadingPlaceholder) {
			return [<ActivityIndicator />];
		}

		return rnElements;
	}, [loadingState, loadingPlaceholder, rnElements]);

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
