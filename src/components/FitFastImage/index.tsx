import ImageSkeleton from "../Skeleton/ImageSkeleton";
import { FunctionComponent, memo, useEffect, useRef, useState } from "react";
import { Image, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

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
		<FastImage
			onLoadStart={onLoadStart}
			onLoadEnd={onLoadEndOrOnError}
			onError={onLoadEndOrOnError}
			source={{ uri: uri }}
			style={[styles.image, { aspectRatio }]}
			resizeMode={FastImage.resizeMode.contain}
			aria-label={label}
			accessibilityLabel={label}
			defaultSource={require("./../../../assets/image-fallback.png")}
		>
			{isLoading ? <ImageSkeleton /> : null}
		</FastImage>
	);
};

const styles = StyleSheet.create({
	image: {
		width: "100%",
	},
	indicator: {
		paddingVertical: 16,
	},
});

export default memo(FitFastImage);
