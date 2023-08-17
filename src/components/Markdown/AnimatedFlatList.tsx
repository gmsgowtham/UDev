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
import {
	FlatListProps,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
	View,
} from "react-native";
import { useMarkdown } from "react-native-marked";
import { useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

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

		const markdownTheme = useMemo(() => {
			return getMarkdownTheme(theme);
		}, [theme]);

		const rnElements = useMarkdown(value, {
			renderer: renderer,
			theme: markdownTheme,
			tokenizer: tokenizer,
		});

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
