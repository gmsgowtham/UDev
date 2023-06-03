import { buildURLParams } from "./../url";
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
