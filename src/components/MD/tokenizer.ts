import {
	MarkedTokenizer,
	MarkedLexer,
	type CustomToken,
} from "react-native-marked";

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
				text,
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
		 * *{% embed* url *%}*
		 */
		const match = src.match(/^[*]?{% (embed|link)[*]? (.*?)[*]?%}[*]?/);
		if (match && match.length > 2) {
			const token: CustomToken = {
				text: match[2].trim(),
				identifier: "embed",
				type: "custom",
				raw: match[0],
				tokens: [],
			};
			return token;
		}

		return super.paragraph(src);
	}
}

export default new MDTokenizer();
