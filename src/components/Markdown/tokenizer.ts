import { type CustomToken, MarkedTokenizer } from "react-native-marked";
import { getStackoverflowEmbedURL, getYoutubeEmbedURL } from "../../utils/url";

class MDTokenizer extends MarkedTokenizer<CustomToken> {
	paragraph(this: MarkedTokenizer<CustomToken>, src: string) {
		/**
		 * CTA buttons
		 *
		 * Matches the following pattern
		 * {% cta url %} description {% endcta %}
		 */
		const ctaMatch = src.match(/^{% cta(.*?)%}(.*?){% endcta %}/);
		if (ctaMatch && ctaMatch.length > 2) {
			const cta = ctaMatch[1].trim();
			const text = ctaMatch[2].trim();
			const token: CustomToken = {
				raw: ctaMatch[0],
				identifier: "cta",
				type: "custom",
				args: {
					cta,
					text,
				},
				tokens: [],
			};
			return token;
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
			const token: CustomToken = {
				identifier: "embed",
				type: "custom",
				raw: embedMatch[0],
				tokens: [],
				args: {
					text: embedMatch[2].trim(),
				},
			};
			return token;
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
			const token: CustomToken = {
				raw: detailsMatch[0],
				identifier: "details",
				type: "custom",
				args: {},
				tokens: [],
			};
			return token;
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
			const token: CustomToken = {
				identifier: "embed",
				type: "custom",
				raw: youtubeMatch[0],
				tokens: [],
				args: {
					text: url,
				},
			};
			return token;
		}

		const stackoverflowMatch = src.match(
			/^[*]?{% (stackoverflow)[*]? (.*?)[*]?%}[*]?/,
		);
		if (stackoverflowMatch && stackoverflowMatch.length > 2) {
			const url = getStackoverflowEmbedURL(stackoverflowMatch[2]);
			const token: CustomToken = {
				identifier: "embed",
				type: "custom",
				raw: stackoverflowMatch[0],
				tokens: [],
				args: {
					text: url,
				},
			};
			return token;
		}

		return super.paragraph(src);
	}
}

export default new MDTokenizer();
