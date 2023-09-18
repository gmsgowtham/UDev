import { useFocusEffect } from "@react-navigation/native";
import {
	FunctionComponent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ActivityIndicator, IconButton, MD3Theme } from "react-native-paper";
import Video, { OnLoadData, OnProgressData } from "react-native-video";
import { VIDEO_UI_HIDE_TIMEOUT } from "../../utils/const";
import BottomBar from "./BottomBar";
import Overlay from "./Overlay";
import TopBar from "./TopBar";

interface VideoPlayerProps {
	source:
		| {
				uri?: string | undefined;
				headers?: { [key: string]: string } | undefined;
				type?: string | undefined;
		  }
		| number;
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
	cover,
	theme,
	isBookmarked,
	onBackActionPress,
	onShareActionPress,
	onBookmarkActionPress,
	onOpenInBrowserActionPress,
}) => {
	const [videoData, setVideoData] = useState<OnLoadData | undefined>();
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isPaused, setIsPaused] = useState(false);
	const [isFullscreen, setIsFullScreen] = useState(false);
	const [shouldHideActions, setShouldHideActions] = useState(false);
	const playerRef = useRef<Video | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

	useFocusEffect(
		useCallback(() => {
			return () => {
				if (timeoutRef.current) clearInterval(timeoutRef.current);
			};
		}, []),
	);

	useEffect(() => {
		if (isPaused) stopUIHideTimeout();
		else startUIHideTimeout();
	}, [isPaused]);

	useEffect(() => {
		if (shouldHideActions) stopUIHideTimeout();
		else startUIHideTimeout();
	}, [shouldHideActions]);

	const onLoad = (data: OnLoadData) => {
		setVideoData(data);
		setIsLoading(false);
		startUIHideTimeout();
	};

	const onBuffer = () => {
		setIsLoading(true);
	};

	const onProgress = (data: OnProgressData) => {
		setCurrentTime(data.currentTime);
		setIsLoading(false);
	};

	const startUIHideTimeout = () => {
		timeoutRef.current = setTimeout(() => {
			setShouldHideActions(true);
		}, VIDEO_UI_HIDE_TIMEOUT);
	};

	const stopUIHideTimeout = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	};

	const togglePauseState = () => {
		setIsPaused((isPaused) => !isPaused);
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
		playerRef.current?.seek(value);
	};

	return (
		<View style={styles.container}>
			<Video
				ref={(ref) => {
					playerRef.current = ref;
				}}
				source={source}
				style={styles.video}
				poster={cover}
				paused={isPaused}
				fullscreen={isFullscreen}
				progressUpdateInterval={750}
				onLoad={onLoad}
				onProgress={onProgress}
				onBuffer={onBuffer}
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
							duration={videoData?.duration}
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
