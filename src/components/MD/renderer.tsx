import { ReactNode } from "react";
import { Renderer, RendererInterface } from "react-native-marked";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import FitFastImage from "../FitFastImage";
import SyntaxHighlighter from "../SyntaxHighlighter";
import DevEmbed from "./../Embed/Dev";
import CTAButton from "../CTAButton";
import { isStringOf } from "../../utils/typeof";

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

	custom(
		identifier: string,
		_raw: string,
		_children: ReactNode[],
		args: Record<string, unknown> = {},
	): ReactNode {
		if (identifier === "cta" && isStringOf(args.text) && isStringOf(args.cta)) {
			return (
				<CTAButton
					key={this.getKey()}
					text={args.text as string}
					url={args.cta as string}
				/>
			);
		}
		if (identifier === "embed" && isStringOf(args.text)) {
			return <DevEmbed key={this.getKey()} url={args.text as string} />;
		}
		return null;
	}
}

export default new MDRenderer();
