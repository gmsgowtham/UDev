import { buildURLParams, getYoutubeEmbedURL } from "./../url";
describe(buildURLParams, () => {
	it("empty input", () => {
		expect(buildURLParams({})).toBe("");
	});
	it("valid input", () => {
		expect(
			buildURLParams({
				hello: "world",
				foo: "Bar",
				no: 2,
			}),
		).toBe("hello=world&foo=Bar&no=2");
	});
	it("undefined, null, falsy values", () => {
		expect(
			buildURLParams({
				hello: "world",
				foo: null,
				bar: undefined,
				baz: false,
			}),
		).toBe("hello=world&baz=false");
	});
});

describe(getYoutubeEmbedURL, () => {
	it("Id only", () => {
		expect(getYoutubeEmbedURL("840TmQNxjKY")).toBe(
			"https://www.youtube.com/watch?v=840TmQNxjKY",
		);
	});
	it("Full URL", () => {
		expect(
			getYoutubeEmbedURL("https://www.youtube.com/watch?v=840TmQNxjKY"),
		).toBe("https://www.youtube.com/watch?v=840TmQNxjKY");
	});
});
