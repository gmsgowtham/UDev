import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { type FunctionComponent, memo, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";
import useUserColorScheme from "../../hooks/useUserColorScheme";
import { COLOR_SCHEME_VALUES } from "../../mmkv/colorScheme";
interface FeedSkeletonProps {
	height?: number;
}

const SKELETON_ITEM_HEIGHT = 220;

const FeedSkeleton: FunctionComponent<FeedSkeletonProps> = ({
	height = SKELETON_ITEM_HEIGHT,
}) => {
	const { height: windowHeight } = useWindowDimensions();
	const skeletonItemsToShow = useMemo(() => {
		return Math.ceil(windowHeight / height);
	}, [height, windowHeight]);

	const colorScheme = useUserColorScheme();
	const theme = useTheme();
	const colorMode = useMemo(() => {
		if (colorScheme === COLOR_SCHEME_VALUES.Light) return "light";
		return "dark";
	}, [colorScheme]);
	return (
		<MotiView
			transition={{
				type: "spring",
			}}
			style={styles.container}
			animate={{ backgroundColor: theme.colors.background }}
		>
			{[...Array(skeletonItemsToShow)].map((_, i) => (
				<Skeleton
					// biome-ignore lint/suspicious/noArrayIndexKey: this is an controlled array
					key={`skeleton_item_${i}`}
					colorMode={colorMode}
					radius={16}
					height={SKELETON_ITEM_HEIGHT}
					width={"100%"}
				/>
			))}
		</MotiView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 12,
		padding: 12,
	},
});

export default memo(FeedSkeleton);
