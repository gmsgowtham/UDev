import { ReactNode } from "react";
import { Renderer, RendererInterface } from "react-native-marked";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import FitFastImage from "../FitFastImage";
import SyntaxHighlighter from "../SyntaxHighlighter";

class MDRenderer extends Renderer implements RendererInterface {
	image = (
		uri: string,
		alt?: string | undefined,
		_style?: ImageStyle | undefined,
	): ReactNode => <FitFastImage key={this.getKey()} uri={uri} label={alt} />;

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
				code={text}
			/>
		);
	};
}

export default new MDRenderer();
