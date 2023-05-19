import { FunctionComponent, memo, useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import FastImage from "react-native-fast-image";

type FitFastImageProps = {
	uri: string;
	label?: string;
};

const FitFastImage: FunctionComponent<FitFastImageProps> = ({ uri, label }) => {
	let isFirstLoad = false;
	const [isLoading, setIsLoading] = useState(false);
	const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

	useEffect(() => {
		fetchOriginalSizeFromRemoteImage();
	}, []);

	const onLoadStart = () => {
		if (isFirstLoad) {
			setIsLoading(true);
			isFirstLoad = false;
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
			style={{ width: "100%", aspectRatio }}
			resizeMode={FastImage.resizeMode.contain}
			aria-label={label}
		>
			{isLoading ? <ActivityIndicator size={"small"} /> : null}
		</FastImage>
	);
};

export default memo(FitFastImage);
