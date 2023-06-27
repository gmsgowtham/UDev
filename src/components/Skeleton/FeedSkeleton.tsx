import {
	COLOR_SCHEME_VALUES,
	DEFAULT_COLOR_SCHEME,
	useUserColorScheme,
} from "../../mmkv/colorScheme";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { FunctionComponent, memo, useMemo } from "react";
import {
	ColorSchemeName,
	Dimensions,
	StyleSheet,
	useColorScheme,
} from "react-native";
import { useTheme } from "react-native-paper";
interface FeedSkeletonProps {
	height?: number;
}

const { height: windowHeight } = Dimensions.get("window");

const SKELETON_ITEM_HEIGHT = 220;

const FeedSkeleton: FunctionComponent<FeedSkeletonProps> = ({
	height = SKELETON_ITEM_HEIGHT,
}) => {
	const skeletonItemsToShow = useMemo(() => {
		return Math.ceil(windowHeight / height);
	}, [height]);

	const [userColorScheme] = useUserColorScheme();
	const systemColorScheme = useColorScheme();
	const theme = useTheme();
	const colorMode = useMemo(() => {
		let colorScheme: ColorSchemeName;
		if (userColorScheme === COLOR_SCHEME_VALUES.System) {
			colorScheme = systemColorScheme ?? DEFAULT_COLOR_SCHEME;
		} else {
			colorScheme = userColorScheme as ColorSchemeName;
		}

		if (colorScheme === COLOR_SCHEME_VALUES.Light) return "light";
		return "dark";
	}, [userColorScheme, systemColorScheme]);
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
		gap: 16,
		padding: 16,
	},
});

export default memo(FeedSkeleton);
