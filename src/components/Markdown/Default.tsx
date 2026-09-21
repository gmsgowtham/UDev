import {
	type FunctionComponent,
	type ReactNode,
	memo,
	useCallback,
	useMemo,
} from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { type CardSection, splitCardSections } from "../../utils/card";
import MarkdownCard from "./Card";
import MarkdownChunk from "./Chunk";

interface MarkdownRendererProps {
	loadingState?: boolean;
	value?: string;
	headerComponent?: () => React.JSX.Element | null;
	loadingPlaceholder?: ReactNode;
}

type ListItem = CardSection | ReactNode;

const isCardSection = (item: ListItem): item is CardSection => {
	return (
		typeof item === "object" &&
		item !== null &&
		"type" in item &&
		"content" in item
	);
};

const RenderMarkdownDefault: FunctionComponent<MarkdownRendererProps> = ({
	value = "",
	loadingState = false,
	headerComponent,
	loadingPlaceholder,
}) => {
	const theme = useTheme();

	const sections = useMemo(() => splitCardSections(value), [value]);

	const loadingElements: ReactNode[] = useMemo(() => {
		if (!loadingState) {
			return [];
		}
		if (loadingPlaceholder) {
			return [loadingPlaceholder];
		}
		return [<ActivityIndicator />];
	}, [loadingState, loadingPlaceholder]);

	const renderItem = useCallback(({ item }: { item: ListItem }) => {
		if (isCardSection(item)) {
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
		}
		return <View style={styles.item}>{item}</View>;
	}, []);

	const keyExtractor = useCallback(
		(_: ListItem, index: number) => index.toString(),
		[],
	);

	return (
		<FlatList
			removeClippedSubviews={false}
			keyExtractor={keyExtractor}
			maxToRenderPerBatch={8}
			initialNumToRender={8}
			style={{
				backgroundColor: theme.colors.surface,
			}}
			data={loadingState ? loadingElements : sections}
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
