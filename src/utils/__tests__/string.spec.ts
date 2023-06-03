import { replaceNewlines } from "./../string";

describe(replaceNewlines, () => {
	it("empty", () => {
		expect(replaceNewlines("", "")).toBe("");
		expect(replaceNewlines(" ", "")).toBe(" ");
	});
	it("valid input", () => {
		expect(replaceNewlines("Hello\nWorld", " ")).toBe("Hello World");
		expect(replaceNewlines("Hello\n\nWorld", " ")).toBe("Hello  World");
		expect(replaceNewlines("Hello\rWorld", " ")).toBe("Hello World");
		expect(replaceNewlines("Hello\r\rWorld", " ")).toBe("Hello  World");
		expect(replaceNewlines("Hello\n\rWorld", " ")).toBe("Hello  World");
	});
});
