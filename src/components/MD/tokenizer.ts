import {
	MarkedTokenizer,
	MarkedLexer,
	type CustomToken,
} from "react-native-marked";

class MDTokenizer extends MarkedTokenizer<CustomToken> {
	paragraph(this: MarkedTokenizer<CustomToken>, src: string) {
		const match = src.match(/^{%(.*?)%}/);
		if (match?.[1]) {
			const value = match[1].trim();
			const [identifier = "", text = ""] = value.split(" ");
			const token: CustomToken = {
				text,
				identifier,
				type: "custom",
				raw: match[0],
				tokens: MarkedLexer(text),
			};
			return token;
		}

		return super.paragraph(src);
	}
}

export default new MDTokenizer();
