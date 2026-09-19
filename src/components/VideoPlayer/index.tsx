import { useEvent } from "expo";
import { useFocusEffect } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import {
	type FunctionComponent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
	ActivityIndicator,
	IconButton,
	type MD3Theme,
} from "react-native-paper";
import { VIDEO_UI_HIDE_TIMEOUT } from "../../utils/const";
import BottomBar from "./BottomBar";
import Overlay from "./Overlay";
import TopBar from "./TopBar";

interface VideoPlayerProps {
	source: { uri: string };
	title: string;
	cover: string;
	theme: MD3Theme;
	isBookmarked: boolean;
	onBackActionPress: () => void;
	onShareActionPress: () => void;
	onBookmarkActionPress: () => void;
	onOpenInBrowserActionPress: () => void;
}

const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
	source,
	title,
	theme,
	isBookmarked,
	onBackActionPress,
	onShareActionPress,
	onBookmarkActionPress,
	onOpenInBrowserActionPress,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isFullscreen, setIsFullScreen] = useState(false);
	const [shouldHideActions, setShouldHideActions] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	const player = useVideoPlayer({ uri: source.uri }, (p) => {
		p.loop = false;
		p.play();
	});

	const { isPlaying } = useEvent(player, "playingChange") ?? {
		isPlaying: player.playing,
	};
	const { currentTime = 0 } = useEvent(player, "timeUpdate") ?? {};
	const { status } = useEvent(player, "statusChange") ?? {
		status: player.status,
	};

	const isPaused = !isPlaying;
	const duration = player.duration > 0 ? player.duration : undefined;

	useFocusEffect(
		useCallback(() => {
			return () => {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			};
		}, []),
	);

	useEffect(() => {
		if (status === "error") {
			setIsLoading(false);
		}
	}, [status]);

	useEffect(() => {
		if (isPaused) stopUIHideTimeout();
		else startUIHideTimeout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPaused]);

	useEffect(() => {
		if (shouldHideActions) stopUIHideTimeout();
		else startUIHideTimeout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldHideActions]);

	const onFirstFrameRender = () => {
		setIsLoading(false);
		startUIHideTimeout();
	};

	const startUIHideTimeout = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setShouldHideActions(true);
		}, VIDEO_UI_HIDE_TIMEOUT);
	};

	const stopUIHideTimeout = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	};

	const togglePauseState = () => {
		if (player.playing) {
			player.pause();
		} else {
			player.play();
		}
	};

	const toggleOverlayVisibility = () => {
		setShouldHideActions((shouldHideActions) => {
			return !shouldHideActions;
		});
	};

	const onFullScreenPress = () => {
		setIsFullScreen((isFullscreen) => !isFullscreen);
	};

	const onSeek = (value: number) => {
		player.currentTime = value;
	};

	return (
		<View style={[styles.container, isFullscreen && styles.fullscreen]}>
			<VideoView
				player={player}
				style={styles.video}
				contentFit="contain"
				nativeControls={false}
				fullscreenOptions={{ enable: true }}
				onFirstFrameRender={onFirstFrameRender}
			/>
			{isLoading ? (
				<Overlay styles={styles.loadingOverlay} shouldHide={false}>
					<ActivityIndicator size={"large"} />
				</Overlay>
			) : (
				<Pressable
					onPress={toggleOverlayVisibility}
					style={styles.absoluteFill}
					accessibilityLabel="Backdrop"
					aria-label="Backdrop"
				>
					<Overlay
						styles={styles.playOverlay}
						shouldHide={shouldHideActions && !isPaused}
					>
						<TopBar
							theme={theme}
							isBookmarked={isBookmarked}
							onBackActionPress={onBackActionPress}
							onShareActionPress={onShareActionPress}
							onOpenInBrowserActionPress={onOpenInBrowserActionPress}
							onBookmarkActionPress={onBookmarkActionPress}
						/>
						<View style={styles.playButtonContainer}>
							<IconButton
								icon={isPaused ? "play-arrow" : "pause"}
								size={50}
								onPress={togglePauseState}
								mode="contained-tonal"
								pointerEvents="box-none"
								theme={theme}
								accessibilityLabel="Play or Pause"
								aria-label="Play or Pause"
							/>
						</View>
						<BottomBar
							title={title}
							theme={theme}
							currentTime={currentTime}
							duration={duration}
							isFullscreen={isFullscreen}
							onFullScreenPress={onFullScreenPress}
							onSeek={onSeek}
						/>
					</Overlay>
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		position: "relative",
	},
	fullscreen: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 10,
	},
	listContainer: {
		margin: 8,
		padding: 4,
		paddingBottom: 24,
	},
	video: {
		flex: 1,
	},
	absoluteFill: {
		flex: 1,
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	playButtonContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingOverlay: {
		alignItems: "center",
		justifyContent: "center",
	},
	playOverlay: {
		justifyContent: "space-between",
	},
});

export default memo(VideoPlayer);
