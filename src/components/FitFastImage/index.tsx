import { Image as ExpoImage } from "expo-image";
import {
	type FunctionComponent,
	memo,
	useEffect,
	useRef,
	useState,
} from "react";
import { Image, StyleSheet, View } from "react-native";
import ImageSkeleton from "../Skeleton/ImageSkeleton";

type FitFastImageProps = {
	uri: string;
	label?: string;
};

const DEFAULT_ASPECT_RATIO = 1.5; // 3:2 aspect ratio

const FitFastImage: FunctionComponent<FitFastImageProps> = ({
	uri,
	label = "image",
}) => {
	const isFirstLoad = useRef(true);
	const [isLoading, setIsLoading] = useState(false);
	const [aspectRatio, setAspectRatio] = useState<number>(DEFAULT_ASPECT_RATIO);

	useEffect(() => {
		fetchOriginalSizeFromRemoteImage();
	}, []);

	const onLoadStart = () => {
		if (isFirstLoad.current) {
			setIsLoading(true);
			isFirstLoad.current = false;
		}
	};

	const onLoadEndOrOnError = () => {
		if (isLoading) {
			setIsLoading(false);
		}
	};

	const fetchOriginalSizeFromRemoteImage = () => {
		Image.getSize(uri, (width: number, height: number) => {
			setAspectRatio(width / height);
		});
	};

	return (
		<View style={[styles.image, { aspectRatio }]}>
			<ExpoImage
				onLoadStart={onLoadStart}
				onLoad={onLoadEndOrOnError}
				onError={onLoadEndOrOnError}
				source={{ uri: uri }}
				style={[styles.image, { aspectRatio }]}
				contentFit="contain"
				accessibilityLabel={label}
				aria-label={label}
				placeholder={require("./../../../assets/image-fallback.png")}
			/>
			{isLoading ? (
				<View style={styles.skeletonOverlay}>
					<ImageSkeleton />
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: "100%",
	},
	skeletonOverlay: {
		...StyleSheet.absoluteFill,
	},
	indicator: {
		paddingVertical: 16,
	},
});

export default memo(FitFastImage);
