import { perfArrayConcat } from "./../array";

describe(perfArrayConcat, () => {
	it("empty", () => {
		expect(perfArrayConcat([], [])).toStrictEqual([]);
	});
	it("valid input", () => {
		expect(perfArrayConcat([1, 2, 3], [4, 5])).toStrictEqual([1, 2, 3, 4, 5]);
		expect(perfArrayConcat([], [4, 5])).toStrictEqual([4, 5]);
		expect(perfArrayConcat([1, 2, 3], [])).toStrictEqual([1, 2, 3]);
	});
});
