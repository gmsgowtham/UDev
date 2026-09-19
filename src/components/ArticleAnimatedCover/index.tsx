import { Image } from "expo-image";
import { type FunctionComponent, memo, useMemo } from "react";
import {
	type LayoutChangeEvent,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import Animated, { type AnimatedStyle } from "react-native-reanimated";
import { ARTICLE_COVER_IMAGE_ASPECT_RATIO } from "../../utils/const";
import TagList from "../TagList";

interface ArticleAnimatedCoverProps {
	onCoverLayout: (event: LayoutChangeEvent) => void;
	animations: {
		container?: AnimatedStyle<ViewStyle>;
		image?: AnimatedStyle<ViewStyle>;
	};
	id: number;
	cover?: string | null;
	title: string;
	author: {
		imageUri: string;
		name: string;
	};
	dateReadable: string;
	tags?: string[];
	organizationName?: string;
}

const ArticleAnimatedCover: FunctionComponent<ArticleAnimatedCoverProps> = ({
	cover,
	title,
	author,
	dateReadable,
	tags = [],
	onCoverLayout,
	animations,
	organizationName,
}) => {
	const theme = useTheme();

	const authorTitle = useMemo(() => {
		if (organizationName) {
			return `${author.name} for ${organizationName}`;
		}

		return author.name;
	}, [organizationName, author.name]);

	return (
		<Animated.View
			onLayout={onCoverLayout}
			style={[
				styles.header,
				{ backgroundColor: theme.colors.background },
				animations.container,
			]}
		>
			{cover ? (
				<Animated.View style={animations.image}>
					<Image
						source={{ uri: cover }}
						style={styles.image}
						contentFit="contain"
					/>
				</Animated.View>
			) : null}
			<View style={styles.wrapper}>
				<Text variant="headlineMedium">{title}</Text>
				<TagList tags={tags} />
				<View style={styles.authorContainer}>
					<Avatar.Image size={40} source={{ uri: author.imageUri }} />
					<View style={styles.authorInfo}>
						<Text variant="titleMedium" numberOfLines={1}>
							{authorTitle}
						</Text>
						<Text variant="labelMedium">{dateReadable}</Text>
					</View>
				</View>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 12,
		marginVertical: 16,
		gap: 8,
	},
	image: {
		width: "100%",
		aspectRatio: ARTICLE_COVER_IMAGE_ASPECT_RATIO,
	},
	authorContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
		marginTop: 8,
	},
	authorInfo: {
		gap: 4,
		justifyContent: "space-between",
	},
	header: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 64,
		zIndex: 1,
	},
});

export default memo(ArticleAnimatedCover);
