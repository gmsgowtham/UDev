import { MarkedLexer, type Token, type Tokens } from "react-native-marked";
import tokenizer, { EmbedTypes } from "../tokenizer";

const lex = (src: string): Token[] =>
	MarkedLexer(src, { tokenizer }) as Token[];

const imageTokens = (src: string): Tokens.Image[] =>
	lex(src).filter((token): token is Tokens.Image => token.type === "image");

describe("MDTokenizer liquid embeds", () => {
	it("emits a CTA image token", () => {
		const tokens = imageTokens(
			"{% cta https://example.com %} Click here {% endcta %}",
		);
		expect(tokens).toHaveLength(1);
		expect(tokens[0]).toMatchObject({
			href: "https://example.com",
			text: "Click here",
			title: EmbedTypes.CTA,
		});
	});

	it("emits a youtube image token with the embed URL", () => {
		const tokens = imageTokens("{% youtube dQw4w9WgXcQ %}");
		expect(tokens).toHaveLength(1);
		expect(tokens[0].title).toBe(EmbedTypes.Youtube);
		expect(tokens[0].href).toContain("dQw4w9WgXcQ");
	});

	it("emits link, tweet and stackoverflow image tokens", () => {
		const link = imageTokens("{% link https://example.com %}");
		expect(link).toHaveLength(1);
		expect(link[0].title).toBe(EmbedTypes.Link);
		expect(link[0].href).toBe("https://example.com");

		const tweet = imageTokens("{% tweet https://twitter.com/x/status/1 %}");
		expect(tweet).toHaveLength(1);
		expect(tweet[0].title).toBe(EmbedTypes.Tweet);

		const stackoverflow = imageTokens(
			"{% stackoverflow https://stackoverflow.com/q/1 %}",
		);
		expect(stackoverflow).toHaveLength(1);
		expect(stackoverflow[0].title).toBe(EmbedTypes.Stackoverflow);
	});

	it("emits a space token for details blocks (renders nothing)", () => {
		const tokens = lex("{% details summary %}");
		expect(tokens).toHaveLength(1);
		expect(tokens[0].type).toBe("space");
	});

	it("leaves regular paragraphs untouched", () => {
		const tokens = lex("Hello world");
		expect(tokens).toHaveLength(1);
		expect(tokens[0].type).toBe("paragraph");
	});

	it("does not treat liquid tags inside code blocks as embeds", () => {
		const tokens = lex("```\n{% youtube dQw4w9WgXcQ %}\n```");
		expect(tokens).toHaveLength(1);
		expect(tokens[0].type).toBe("code");
	});
});
