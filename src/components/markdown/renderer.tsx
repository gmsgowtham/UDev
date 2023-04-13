import { ReactNode } from "react";
import { Renderer, RendererInterface } from "react-native-marked";
import { ImageStyle } from "react-native";
import { StyledFastImage } from "../../zephyr/styled";
import FastImage from "react-native-fast-image";
import FitFastImage from "../FitFastImage";

class MDRenderer extends Renderer implements RendererInterface {
	constructor() {
		super();
	}

	image = (
		uri: string,
		alt?: string | undefined,
		style?: ImageStyle | undefined,
	): ReactNode => (
		<FitFastImage
			key={this.getKey()}
			uri={uri}
			label={alt}
			resizeMode={FastImage.resizeMode.cover}
		/>
	);
}

export default new MDRenderer();
