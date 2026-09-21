import { MarkedTokenizer, type Tokens } from "react-native-marked";
import {
	getStackoverflowEmbedURL,
	getTweetEmbedURL,
	getYoutubeEmbedURL,
} from "../../utils/url";

export enum EmbedTypes {
	Link = "link",
	Youtube = "youtube",
	Tweet = "tweet",
	Stackoverflow = "stackoverflow",
	CTA = "cta",
	Details = "details",
}

class MDTokenizer extends MarkedTokenizer {
	paragraph(src: string) {
		/**
		 * CTA buttons
		 *
		 * Matches the following pattern
		 * {% cta url %} description {% endcta %}
		 */

		const ctaMatch = src.match(/^{% cta(.*?)%}([\s\S]*?){% endcta %}/);
		if (ctaMatch && ctaMatch.length > 2) {
			const cta = ctaMatch[1].trim();
			const text = ctaMatch[2].trim();
			// NOTE: emitted as an image token with the embed kind in `title`
			// (react-native-marked v7 has no custom-token support; the
			// renderer intercepts these in `image()`).
			const token: Tokens.Image = {
				type: "image",
				raw: ctaMatch[0],
				href: cta,
				text,
				tokens: [],
				title: EmbedTypes.CTA,
			};
			return token as unknown as Tokens.Paragraph;
		}

		/**
		 * embeds/links
		 *
		 * Matches the following pattern
		 * {% link url %}
		 * {% embed url %}
		 * {% codepen url %}
		 * *{% embed* url *%}*
		 */
		const embedMatch = src.match(
			/^[*]?{% (embed|link|codepen)[*]? (.*?)[*]?%}[*]?/,
		);
		if (embedMatch && embedMatch.length > 2) {
			const token: Tokens.Image = {
				type: "image",
				raw: embedMatch[0],
				href: embedMatch[2].trim(),
				text: "",
				tokens: [],
				title: EmbedTypes.Link,
			};
			return token as unknown as Tokens.Paragraph;
		}

		/**
		 * Details element
		 *
		 * Matches the following pattern
		 * {% details text %}
		 * details element will not be renderered
		 */
		const detailsMatch = src.match(
			/^[*]?{% (details|enddetails)[*]? (.*?)[*]?%}[*]?/,
		);
		if (detailsMatch && detailsMatch.length > 2) {
			// NOTE: details blocks render as nothing (a space token hits the
			// parser default case, which returns null).
			const token: Tokens.Space = {
				type: "space",
				raw: detailsMatch[0],
			};
			return token as unknown as Tokens.Paragraph;
		}

		/**
		 * Card tags
		 *
		 * `{% card %}...{% endcard %}` blocks are split out before lexing
		 * (see `splitCardSections`); any stray tag that reaches the
		 * tokenizer (unclosed, empty, or leftover) renders as nothing.
		 */
		const cardMatch = src.match(/^[*]?{%\s*(card|endcard)\s*%}[*]?/);
		if (cardMatch) {
			const token: Tokens.Space = {
				type: "space",
				raw: cardMatch[0],
			};
			return token as unknown as Tokens.Paragraph;
		}

		/**
		 * Youtube embed
		 *
		 * Matches the following pattern
		 * {% youtube id %}
		 */
		const youtubeMatch = src.match(/^[*]?{% (youtube)[*]? (.*?)[*]?%}[*]?/);
		if (youtubeMatch && youtubeMatch.length > 2) {
			const url = getYoutubeEmbedURL(youtubeMatch[2]);
			const token: Tokens.Image = {
				type: "image",
				raw: youtubeMatch[0],
				href: url,
				text: "",
				tokens: [],
				title: EmbedTypes.Youtube,
			};
			return token as unknown as Tokens.Paragraph;
		}

		const stackoverflowMatch = src.match(
			/^[*]?{% (stackoverflow)[*]? (.*?)[*]?%}[*]?/,
		);
		if (stackoverflowMatch && stackoverflowMatch.length > 2) {
			const url = getStackoverflowEmbedURL(stackoverflowMatch[2]);
			const token: Tokens.Image = {
				type: "image",
				raw: stackoverflowMatch[0],
				href: url,
				text: "",
				tokens: [],
				title: EmbedTypes.Stackoverflow,
			};
			return token as unknown as Tokens.Paragraph;
		}

		const twitterMatch = src.match(/^[*]?{% (tweet)[*]? (.*?)[*]?%}[*]?/);
		if (twitterMatch && twitterMatch.length > 2) {
			const url = getTweetEmbedURL(twitterMatch[2]);
			const token: Tokens.Image = {
				type: "image",
				raw: twitterMatch[0],
				href: url,
				text: "",
				tokens: [],
				title: EmbedTypes.Tweet,
			};
			return token as unknown as Tokens.Paragraph;
		}

		return super.paragraph(src);
	}
}

export default new MDTokenizer();
