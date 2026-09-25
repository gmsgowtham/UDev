import {
	buildURLParams,
	getYoutubeEmbedURL,
	getYoutubeThumbnailUrl,
	getYoutubeVideoId,
} from "./../url";
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

describe(getYoutubeVideoId, () => {
	it("bare id", () => {
		expect(getYoutubeVideoId("pXOTjxcNzdQ")).toBe("pXOTjxcNzdQ");
	});
	it("watch URL", () => {
		expect(
			getYoutubeVideoId("https://www.youtube.com/watch?v=pXOTjxcNzdQ"),
		).toBe("pXOTjxcNzdQ");
	});
	it("watch URL with extra params", () => {
		expect(
			getYoutubeVideoId("https://www.youtube.com/watch?v=pXOTjxcNzdQ&t=10s"),
		).toBe("pXOTjxcNzdQ");
	});
	it("short and embed URLs", () => {
		expect(getYoutubeVideoId("https://youtu.be/pXOTjxcNzdQ")).toBe(
			"pXOTjxcNzdQ",
		);
		expect(getYoutubeVideoId("https://www.youtube.com/embed/pXOTjxcNzdQ")).toBe(
			"pXOTjxcNzdQ",
		);
		expect(
			getYoutubeVideoId("https://www.youtube.com/shorts/pXOTjxcNzdQ"),
		).toBe("pXOTjxcNzdQ");
	});
	it("invalid input returns null", () => {
		expect(getYoutubeVideoId("")).toBeNull();
		expect(getYoutubeVideoId("not-a-video-id!!")).toBeNull();
		expect(getYoutubeVideoId("https://example.com")).toBeNull();
	});
});

describe(getYoutubeThumbnailUrl, () => {
	it("defaults to hqdefault", () => {
		expect(getYoutubeThumbnailUrl("pXOTjxcNzdQ")).toBe(
			"https://i.ytimg.com/vi/pXOTjxcNzdQ/hqdefault.jpg",
		);
	});
	it("supports other qualities", () => {
		expect(getYoutubeThumbnailUrl("pXOTjxcNzdQ", "maxresdefault")).toBe(
			"https://i.ytimg.com/vi/pXOTjxcNzdQ/maxresdefault.jpg",
		);
	});
});
