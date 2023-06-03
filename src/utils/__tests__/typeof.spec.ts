import { isStringOf } from "./../typeof";

describe(isStringOf, () => {
	it("valid input", () => {
		expect(isStringOf("")).toBe(true);
		expect(isStringOf("123")).toBe(true);
		expect(isStringOf("abc")).toBe(true);
		expect(isStringOf(String(123))).toBe(true);
	});
	it("invalid input", () => {
		expect(isStringOf(1)).toBe(false);
		expect(isStringOf(true)).toBe(false);
		expect(isStringOf(null)).toBe(false);
		expect(isStringOf(undefined)).toBe(false);
		expect(isStringOf([])).toBe(false);
		expect(isStringOf({})).toBe(false);
	});
});
