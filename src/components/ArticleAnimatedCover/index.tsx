import { ARTICLE_COVER_IMAGE_ASPECT_RATIO } from "../../utils/const";
import TagList from "../TagList";
import { FunctionComponent, memo } from "react";
import {
	ImageStyle,
	LayoutChangeEvent,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Avatar, Text, useTheme } from "react-native-paper";
import Animated, { AnimatedStyleProp } from "react-native-reanimated";

interface ArticleAnimatedCoverProps {
	onCoverLayout: (event: LayoutChangeEvent) => void;
	animations: {
		container?: AnimatedStyleProp<ViewStyle>;
		image?: AnimatedStyleProp<ImageStyle>;
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
}

const ArticleAnimatedCover: FunctionComponent<ArticleAnimatedCoverProps> = ({
	cover,
	title,
	author,
	dateReadable,
	tags = [],
	onCoverLayout,
	animations,
}) => {
	const theme = useTheme();
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
					<FastImage
						source={{ uri: cover }}
						style={styles.image}
						resizeMode={FastImage.resizeMode.contain}
					/>
				</Animated.View>
			) : null}
			<View style={styles.wrapper}>
				<View style={styles.authorContainer}>
					<Avatar.Image size={50} source={{ uri: author.imageUri }} />
					<View style={styles.authorInfo}>
						<Text variant="titleMedium">{author.name}</Text>
						<Text variant="labelMedium">{dateReadable}</Text>
					</View>
				</View>
				<Text variant="headlineMedium">{title}</Text>
				<TagList tags={tags} />
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 12,
		marginVertical: 16,
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
		marginBottom: 16,
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
