import { ReactNode } from "react";
import { Renderer, RendererInterface } from "react-native-marked";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import FastImage from "react-native-fast-image";
import FitFastImage from "../FitFastImage";
import SyntaxHighlighter from "../SyntaxHighlighter";

class MDRenderer extends Renderer implements RendererInterface {
	constructor() {
		super();
	}

	image = (
		uri: string,
		alt?: string | undefined,
		_style?: ImageStyle | undefined,
	): ReactNode => (
		<FitFastImage
			key={this.getKey()}
			uri={uri}
			label={alt}
			resizeMode={FastImage.resizeMode.cover}
		/>
	);

	code = (
		text: string,
		language?: string | undefined,
		containerStyle?: ViewStyle | undefined,
		_textStyle?: TextStyle | undefined,
	): ReactNode => {
		return (
			<SyntaxHighlighter
				language={language}
				key={this.getKey()}
				containerStyle={containerStyle}
			>
				{text}
			</SyntaxHighlighter>
		);
	};
}

export default new MDRenderer();
