import { type FunctionComponent, memo, useCallback, useMemo } from "react";
import {
	type FlatListProps,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	StyleSheet,
	View,
} from "react-native";
import { useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";
import { type CardSection, splitCardSections } from "../../utils/card";
import MarkdownCard from "./Card";
import MarkdownChunk from "./Chunk";

interface MarkdownRendererProps {
	value?: string;
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
	flatListProps?: Omit<
		FlatListProps<CardSection>,
		"data" | "renderItem" | "CellRendererComponent"
	>;
}

const RenderMarkdownAnimatedFlatList: FunctionComponent<MarkdownRendererProps> =
	({ onScroll, value = "", flatListProps }) => {
		const theme = useTheme();

		const sections = useMemo(() => splitCardSections(value), [value]);

		const renderItem = useCallback(({ item }: { item: CardSection }) => {
			if (item.type === "card") {
				return (
					<View style={styles.item}>
						<MarkdownCard value={item.content} />
					</View>
				);
			}
			return (
				<View style={styles.item}>
					<MarkdownChunk value={item.content} />
				</View>
			);
		}, []);

		const keyExtractor = useCallback(
			(_: CardSection, index: number) => index.toString(),
			[],
		);

		const {
			style: flatListStyle,
			contentContainerStyle,
			...restFlatListProps
		} = flatListProps ?? {};

		return (
			<Animated.FlatList
				removeClippedSubviews={false}
				style={[
					{ flex: 1, backgroundColor: theme.colors.background },
					flatListStyle,
				]}
				contentContainerStyle={[styles.container, contentContainerStyle]}
				{...restFlatListProps}
				keyExtractor={keyExtractor}
				maxToRenderPerBatch={8}
				initialNumToRender={8}
				data={sections}
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
