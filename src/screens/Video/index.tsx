import { StackParamList } from "../../router/types";
import { logError } from "../../utils/log";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FunctionComponent, useState } from "react";
import { Dimensions, Linking, Share, StyleSheet, View } from "react-native";
import VideoPlayer from "react-native-media-console";
import { FAB, Text, Tooltip } from "react-native-paper";

type Props = NativeStackScreenProps<StackParamList, "Video">;

const { width } = Dimensions.get("window");

const ArticleScreen: FunctionComponent<Props> = ({ route, navigation }) => {
	const { params } = route;
	const { source, title, url, cover } = params;
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isControlsVisible, setIsControlsVisible] = useState(true);

	const onBackActionPress = () => {
		navigation.goBack();
	};

	const onShareActionPress = async () => {
		try {
			await Share.share({
				message: url,
				url: url,
				title: title,
			});
		} catch (e) {
			logError(e as Error, "fn: onShareActionPress exception");
		}
	};

	const onOpenInBrowserActionPress = async () => {
		await Linking.openURL(url);
	};

	return (
		<View style={styles.container}>
			<VideoPlayer
				disableVolume
				tapAnywhereToPause
				toggleResizeModeOnFullscreen={false}
				fullscreen={isFullScreen}
				source={{ uri: source }}
				style={styles.backgroundVideo}
				poster={cover}
				onBack={onBackActionPress}
				controlTimeoutDelay={5000}
				onEnterFullscreen={() => setIsFullScreen(true)}
				onExitFullscreen={() => setIsFullScreen(false)}
				onHideControls={() => setIsControlsVisible(false)}
				onShowControls={() => setIsControlsVisible(true)}
			/>
			{isControlsVisible ? (
				<>
					<View style={styles.titleContainer}>
						<Text variant="titleLarge" style={styles.title}>
							{title}
						</Text>
					</View>
					<View style={styles.fabActions}>
						<Tooltip title="Open in browser">
							<FAB
								icon="launch"
								accessibilityLabel="Open in browser"
								onPress={onOpenInBrowserActionPress}
								style={styles.fab}
								color={"#fff"}
							/>
						</Tooltip>
						<Tooltip title="Share">
							<FAB
								icon="share"
								accessibilityLabel="Share"
								onPress={onShareActionPress}
								style={styles.fab}
								color={"#fff"}
							/>
						</Tooltip>
					</View>
				</>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		position: "relative",
	},
	listContainer: {
		margin: 8,
		padding: 4,
		paddingBottom: 24,
	},
	backgroundVideo: {
		flex: 1,
	},
	titleContainer: {
		position: "absolute",
		bottom: 100,
		left: 16,
		width: width * (3 / 4),
	},
	title: {
		color: "#fff",
	},
	fabActions: {
		position: "absolute",
		gap: 16,
		bottom: 100,
		right: 16,
	},
	fab: {
		backgroundColor: "transparent",
	},
});

export default ArticleScreen;
