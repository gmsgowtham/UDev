import {
	AnimatedLegendList,
	type AnimatedLegendListProps,
} from "@legendapp/list/reanimated";
import { type FunctionComponent, memo, useCallback, useMemo } from "react";
import {
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	StyleSheet,
	View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { type CardSection, splitCardSections } from "../../utils/card";
import MarkdownCard from "./Card";
import MarkdownChunk from "./Chunk";

interface MarkdownRendererProps {
	value?: string;
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
	flatListProps?: Omit<
		AnimatedLegendListProps<CardSection>,
		"data" | "renderItem"
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
			<AnimatedLegendList
				style={[
					{ flex: 1, backgroundColor: theme.colors.surface },
					flatListStyle,
				]}
				contentContainerStyle={[styles.container, contentContainerStyle]}
				{...restFlatListProps}
				keyExtractor={keyExtractor}
				estimatedItemSize={300}
				data={sections}
				renderItem={renderItem}
				// AnimatedLegendList types onScroll with its own synthetic event
				// shapes, so a Reanimated worklet scroll handler needs a cast
				// (runtime-compatible, see legend-list#398).
				onScroll={onScroll as AnimatedLegendListProps<CardSection>["onScroll"]}
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
