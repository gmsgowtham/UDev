import { getActualLangForCodeSnippet } from "../../utils/markdown";
import { isStringOf } from "../../utils/typeof";
import CTAButton from "../CTAButton";
import FitFastImage from "../FitFastImage";
import SyntaxHighlighter from "../SyntaxHighlighter";
import DevEmbed from "./../Embed/DevEmbed";
import { unescape as unescapeHTML } from "html-escaper";
import { ReactNode } from "react";
import {
	ImageStyle,
	StyleSheet,
	Text,
	TextStyle,
	ViewStyle,
} from "react-native";
import { Renderer, RendererInterface } from "react-native-marked";

class MDRenderer extends Renderer implements RendererInterface {
	image = (uri: string, alt?: string, _style?: ImageStyle): ReactNode => (
		<FitFastImage key={this.getKey()} uri={uri} label={alt} />
	);

	code = (
		text: string,
		language?: string | undefined,
		containerStyle?: ViewStyle | undefined,
		_textStyle?: TextStyle | undefined,
	): ReactNode => {
		const lang = getActualLangForCodeSnippet(language);
		return (
			<SyntaxHighlighter
				language={lang}
				key={this.getKey()}
				containerStyle={containerStyle}
				code={text}
				textStyle={styles.text}
			/>
		);
	};

	codespan(text: string, styles?: TextStyle | undefined): ReactNode {
		return (
			<Text selectable key={this.getKey()} style={styles}>
				{unescapeHTML(text)}
			</Text>
		);
	}

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

const styles = StyleSheet.create({
	text: {
		fontFamily: "Inter-Regular",
	},
});

export default new MDRenderer();
