import renderer from "./renderer";
import tokenizer from "./tokenizer";
import { FlashList } from "@shopify/flash-list";
import {
	FunctionComponent,
	ReactNode,
	memo,
	useCallback,
	useMemo,
} from "react";
import { StyleSheet, View } from "react-native";
import { useMarkdown } from "react-native-marked";
import { ActivityIndicator, useTheme } from "react-native-paper";

interface MarkdownRendererProps {
	loadingState?: boolean;
	value?: string;
	headerComponent?: () => React.JSX.Element | null;
	loadingPlaceholder?: ReactNode;
}

const RenderMarkdown: FunctionComponent<MarkdownRendererProps> = ({
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
		<FlashList
			showsVerticalScrollIndicator={false}
			onEndReachedThreshold={0.75}
			removeClippedSubviews={false}
			keyExtractor={keyExtractor}
			contentContainerStyle={{
				...styles.container,
				backgroundColor: theme.colors.background,
			}}
			data={elements}
			renderItem={renderItem}
			estimatedItemSize={100}
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

export default memo(RenderMarkdown);
