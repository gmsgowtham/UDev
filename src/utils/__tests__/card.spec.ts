import { splitCardSections } from "./../card";

describe(splitCardSections, () => {
	it("returns a single markdown section when there are no cards", () => {
		expect(splitCardSections("Hello world")).toEqual([
			{ type: "markdown", content: "Hello world" },
		]);
	});

	it("splits a card with heading, embed and paragraph", () => {
		const sections = splitCardSections(
			"Intro\n\n{% card %}\n### Overall Winner\n\n{% embed https://dev.to/x %}\n\nSome prose.\n{% endcard %}\n\nOutro",
		);
		expect(sections.map((s) => s.type)).toEqual([
			"markdown",
			"card",
			"markdown",
		]);
		expect(sections[1].content).toContain("### Overall Winner");
		expect(sections[1].content).toContain("{% embed https://dev.to/x %}");
		expect(sections[1].content).toContain("Some prose.");
	});

	it("splits multiple cards", () => {
		const sections = splitCardSections(
			"{% card %}First{% endcard %}\n\n{% card %}Second{% endcard %}",
		);
		expect(sections).toEqual([
			{ type: "card", content: "First" },
			{ type: "card", content: "Second" },
		]);
	});

	it("leaves unclosed card tags as markdown", () => {
		const sections = splitCardSections("Intro\n\n{% card %}\nNo end here");
		expect(sections).toHaveLength(1);
		expect(sections[0].type).toBe("markdown");
		expect(sections[0].content).toContain("{% card %}");
	});

	it("drops empty cards", () => {
		expect(splitCardSections("{% card %}   {% endcard %}")).toEqual([]);
	});

	it("does not split card tags inside fenced code blocks", () => {
		const src = "```\n{% card %}First{% endcard %}\n```";
		const sections = splitCardSections(src);
		expect(sections).toHaveLength(1);
		expect(sections[0].type).toBe("markdown");
		expect(sections[0].content).toBe(src);
	});
});
