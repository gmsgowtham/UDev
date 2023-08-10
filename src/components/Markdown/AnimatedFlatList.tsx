import renderer from "./renderer";
import tokenizer from "./tokenizer";
import {
	FunctionComponent,
	ReactNode,
	memo,
	useCallback,
	useMemo,
} from "react";
import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
	View,
} from "react-native";
import { useMarkdown } from "react-native-marked";
import { ActivityIndicator, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

interface MarkdownRendererProps {
	loadingState?: boolean;
	value?: string;
	headerComponent?: () => React.JSX.Element | null;
	loadingPlaceholder?: ReactNode;
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const RenderMarkdownAnimatedFlatList: FunctionComponent<MarkdownRendererProps> =
	({
		onScroll,
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

		const rnElements = useMarkdown(value, {
			renderer: renderer,
			theme: {
				colors: {
					background: theme.colors.background,
					code: theme.colors.elevation.level2,
					link: theme.colors.primary,
					text: theme.colors.onBackground,
					border: theme.colors.secondary,
				},
			},
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
			<Animated.FlatList
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
