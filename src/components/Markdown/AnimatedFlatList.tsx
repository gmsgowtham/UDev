import {
	FunctionComponent,
	ReactNode,
	memo,
	useCallback,
	useMemo,
} from "react";
import {
	FlatListProps,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
	View,
} from "react-native";
import { useMarkdown, useMarkdownHookOptions } from "react-native-marked";
import { useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";
import renderer from "./renderer";
import getMarkdownStyles from "./styles";
import getMarkdownTheme from "./theme";
import tokenizer from "./tokenizer";

interface MarkdownRendererProps {
	value?: string;
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
	flatListProps?: Omit<FlatListProps<ReactNode>, "data" | "renderItem">;
}

const RenderMarkdownAnimatedFlatList: FunctionComponent<MarkdownRendererProps> =
	({ onScroll, value = "", flatListProps }) => {
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

		return (
			<Animated.FlatList
				contentContainerStyle={styles.container}
				removeClippedSubviews={false}
				style={{
					backgroundColor: theme.colors.background,
				}}
				{...flatListProps}
				keyExtractor={keyExtractor}
				maxToRenderPerBatch={8}
				initialNumToRender={8}
				data={rnElements}
				renderItem={renderItem}
				onScroll={onScroll}
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

export default memo(RenderMarkdownAnimatedFlatList);
