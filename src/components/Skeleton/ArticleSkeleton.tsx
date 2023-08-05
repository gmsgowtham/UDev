import useUserColorScheme from "../../hooks/useUserColorScheme";
import { COLOR_SCHEME_VALUES } from "../../mmkv/colorScheme";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { FunctionComponent, memo, useMemo } from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
interface ArticleSkeletonProps {
	height?: number;
}

const { height } = Dimensions.get("window");

const ArticleSkeleton: FunctionComponent<ArticleSkeletonProps> = () => {
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
			<Skeleton colorMode={colorMode} height={32} width={"50%"} />
			<Skeleton colorMode={colorMode} height={32} width={"100%"} />
			<Skeleton colorMode={colorMode} height={32} width={"100%"} />
			<Skeleton
				colorMode={colorMode}
				radius={16}
				height={height}
				width={"100%"}
			/>
		</MotiView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 8,
		paddingVertical: 8,
	},
});

export default memo(ArticleSkeleton);
