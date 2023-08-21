import { secondsToHMS } from "../../utils/time";
import Slider from "@react-native-community/slider";
import { FunctionComponent, memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { IconButton, MD3Theme, Text, Tooltip } from "react-native-paper";

interface BottomBarProps {
	title: string;
	theme: MD3Theme;
	isFullscreen: boolean;
	onFullScreenPress: () => void;
	currentTime: number;
	onSeek: (value: number) => void;
	duration?: number;
}

const BottomBar: FunctionComponent<BottomBarProps> = ({
	title,
	theme,
	isFullscreen,
	onFullScreenPress,
	currentTime,
	duration = 1,
	onSeek,
}) => {
	const durationToDisplay = useMemo(() => {
		return secondsToHMS(duration);
	}, [duration]);

	const timeToDisplay = useMemo(() => {
		return secondsToHMS(currentTime);
	}, [currentTime]);

	return (
		<View style={styles.container}>
			<Text variant="titleMedium" theme={theme} style={styles.title}>
				{title}
			</Text>
			<View style={styles.actionsWrapper}>
				<View style={styles.sliderWrapper}>
					<View style={styles.timers}>
						<Text theme={theme}>{timeToDisplay}</Text>
						<Text theme={theme}>{durationToDisplay}</Text>
					</View>
					<Slider
						value={currentTime}
						minimumValue={0}
						maximumValue={duration}
						minimumTrackTintColor={theme.colors.primary}
						thumbTintColor={theme.colors.primary}
						maximumTrackTintColor={theme.colors.secondary}
						onSlidingComplete={onSeek}
						accessibilityLabel="seek video"
						aria-label="seek video"
					/>
				</View>
				<Tooltip title="Fullscreen">
					<IconButton
						icon={isFullscreen ? "fullscreen-exit" : "fullscreen"}
						size={24}
						onPress={onFullScreenPress}
						accessibilityHint="Toggle fullscreen"
						accessibilityLabel="Toggle fullscreen"
						theme={theme}
					/>
				</Tooltip>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		paddingHorizontal: 8,
		gap: 24,
	},
	actionsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	title: {
		marginHorizontal: 16,
	},
	sliderWrapper: {
		flex: 1,
	},
	timers: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 16,
		marginBottom: 8,
	},
});

export default memo(BottomBar);
