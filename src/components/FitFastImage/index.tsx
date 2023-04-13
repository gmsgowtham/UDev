import { FunctionComponent, memo, useEffect, useState } from "react";
import { ActivityIndicator, Image, LayoutChangeEvent } from "react-native";
import { StyledFastImage } from "../../zephyr/styled";
import { ResizeMode } from "react-native-fast-image";

type FitFastImageProps = {
	uri: string;
	resizeMode: ResizeMode;
	label?: string;
};

// TODO: fix oversize issues, re-render issues
const FitFastImage: FunctionComponent<FitFastImageProps> = ({
	uri,
	label,
	resizeMode,
}) => {
	let isFirstLoad = false;
	const [isLoading, setIsLoading] = useState(false);
	const [layoutWidth, setLayoutWidth] = useState(0);
	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		fetchOriginalSizeFromRemoteImage();
	}, []);

	const onLayout = (event: LayoutChangeEvent) => {
		const { width: layoutWidth } = event.nativeEvent.layout;
		setLayoutWidth(layoutWidth);
	};

	const onLoad = () => {
		if (isLoading) {
			setIsLoading(false);
		}
	};

	const onLoadStart = () => {
		if (isFirstLoad) {
			setIsLoading(true);
			isFirstLoad = false;
		}
	};

	const onError = () => {
		if (isLoading) {
			setIsLoading(false);
		}
	};

	const fetchOriginalSizeFromRemoteImage = () => {
		Image.getSize(uri, setOriginalSize);
	};

	const setOriginalSize = (width: number, height: number) => {
		setImageSize({ width, height });
	};

	const getHeight = () => {
		return Math.round(getOriginalHeight() * getRatio());
	};

	const getOriginalHeight = () => imageSize.height || 0;

	const getOriginalWidth = () => imageSize.width || 0;

	const getRatio = () => {
		if (getOriginalWidth() === 0) {
			return 0;
		}

		return layoutWidth / getOriginalWidth();
	};

	return (
		<StyledFastImage
			onLayout={onLayout}
			onLoad={onLoad}
			onLoadStart={onLoadStart}
			onError={onError}
			source={{ uri: uri }}
			style={{ height: getHeight(), width: "100%" }}
			resizeMode={resizeMode}
			aria-label={label}
		>
			{isLoading ? <ActivityIndicator size={"small"} /> : null}
		</StyledFastImage>
	);
};

export default memo(FitFastImage);
