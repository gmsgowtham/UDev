import { type FunctionComponent, memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	YoutubeView,
	useYouTubeEvent,
	useYouTubePlayer,
} from "react-native-youtube-bridge";
import { RADIUS } from "../../theme/spacing";
import LinkPreview from "../LinkPreview";

interface Props {
	videoId: string;
	url: string;
	autoplay?: boolean;
}

const YoutubeEmbed: FunctionComponent<Props> = ({
	videoId,
	url,
	autoplay = false,
}) => {
	const player = useYouTubePlayer(videoId, {
		autoplay,
		muted: autoplay,
		controls: true,
		playsinline: true,
		rel: false,
	});
	const [hasError, setHasError] = useState(false);
	useYouTubeEvent(player, "error", () => setHasError(true));
	useYouTubeEvent(player, "autoplayBlocked", () => {
		if (!autoplay) return;
		player.mute();
		player.play();
	});

	if (hasError) {
		return <LinkPreview url={url} />;
	}

	return (
		<View style={styles.wrapper}>
			<YoutubeView
				player={player}
				width="100%"
				height="100%"
				style={styles.player}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		aspectRatio: 16 / 9,
		marginVertical: 8,
		borderRadius: RADIUS.small,
		overflow: "hidden",
		backgroundColor: "#000",
	},
	player: {
		flex: 1,
	},
});

export default memo(YoutubeEmbed);
