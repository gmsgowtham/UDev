import { unescape as unescapeHTML } from "html-escaper";
import type { ReactNode } from "react";
import {
	type ImageStyle,
	StyleSheet,
	Text,
	type TextStyle,
	type ViewStyle,
} from "react-native";
import { Renderer, type RendererInterface } from "react-native-marked";
import { getActualLangForCodeSnippet } from "../../utils/markdown";
import { isStringOf } from "../../utils/typeof";
import { getURLFromText } from "../../utils/url";
import CTAButton from "../CTAButton";
import FitFastImage from "../FitFastImage";
import LinkPreview from "../LinkPreview";
import SvgImage from "../SvgImage";
import SyntaxHighlighter from "../SyntaxHighlighter";
import { EmbedTypes } from "./tokenizer";

class MDRenderer extends Renderer implements RendererInterface {
	image = (uri: string, alt?: string, _style?: ImageStyle): ReactNode => {
		if (uri.includes(".svg")) {
			return <SvgImage key={this.getKey()} uri={uri} label={alt} />;
		}
		return <FitFastImage key={this.getKey()} uri={uri} label={alt} />;
	};

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
		if (
			identifier === EmbedTypes.CTA &&
			isStringOf(args.text) &&
			isStringOf(args.cta)
		) {
			return (
				<CTAButton
					key={this.getKey()}
					text={args.text as string}
					url={args.cta as string}
				/>
			);
		}

		const urlEmbedsTypes = [
			EmbedTypes.Link,
			EmbedTypes.Youtube,
			EmbedTypes.Stackoverflow,
			EmbedTypes.Tweet,
		];
		if (
			urlEmbedsTypes.includes(identifier as unknown as EmbedTypes) &&
			isStringOf(args.text)
		) {
			const url = getURLFromText(args.text as string);
			if (url) {
				return <LinkPreview key={this.getKey()} url={url} type={identifier} />;
			}
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
