import useUserColorScheme from "../../hooks/useUserColorScheme";
import { COLOR_SCHEME_VALUES } from "../../mmkv/colorScheme";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { FunctionComponent, memo, useMemo } from "react";
import { useTheme } from "react-native-paper";

type ImageSkeletonProps = {
	height?: number;
};

const ImageSkeleton: FunctionComponent<ImageSkeletonProps> = ({
	height = 200,
}) => {
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
			animate={{ backgroundColor: theme.colors.background }}
		>
			<Skeleton
				colorMode={colorMode}
				radius={0}
				height={height}
				width={"100%"}
			/>
		</MotiView>
	);
};

export default memo(ImageSkeleton);
