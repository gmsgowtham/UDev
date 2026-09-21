export interface CardSection {
	type: "markdown" | "card";
	content: string;
}

const CARD_PATTERN =
	/[*]?{%\s*card\s*%}[*]?([\s\S]*?)[*]?{%\s*endcard\s*%}[*]?/g;

const FENCED_CODE_PATTERN = /(`{3,4}[^\n]*\n[\s\S]*?^[ \t]*`{3,4}[ \t]*$)/gm;

const splitOutsideCode = (
	value: string,
	split: (chunk: string) => CardSection[],
): CardSection[] => {
	const sections: CardSection[] = [];
	let lastIndex = 0;
	FENCED_CODE_PATTERN.lastIndex = 0;
	let match: RegExpExecArray | null = FENCED_CODE_PATTERN.exec(value);
	while (match !== null) {
		if (match.index > lastIndex) {
			sections.push(...split(value.slice(lastIndex, match.index)));
		}
		sections.push({ type: "markdown", content: match[0] });
		lastIndex = match.index + match[0].length;
		match = FENCED_CODE_PATTERN.exec(value);
	}
	if (lastIndex < value.length) {
		sections.push(...split(value.slice(lastIndex)));
	}
	return sections;
};

const splitChunk = (chunk: string): CardSection[] => {
	const sections: CardSection[] = [];
	let lastIndex = 0;
	CARD_PATTERN.lastIndex = 0;
	let match: RegExpExecArray | null = CARD_PATTERN.exec(chunk);
	while (match !== null) {
		if (match.index > lastIndex) {
			sections.push({
				type: "markdown",
				content: chunk.slice(lastIndex, match.index),
			});
		}
		const inner = (match[1] ?? "").trim();
		if (inner.length > 0) {
			sections.push({ type: "card", content: inner });
		}
		lastIndex = match.index + match[0].length;
		match = CARD_PATTERN.exec(chunk);
	}
	if (lastIndex < chunk.length) {
		sections.push({ type: "markdown", content: chunk.slice(lastIndex) });
	}
	return sections;
};

/**
 * Splits markdown into plain sections and `{% card %}...{% endcard %}`
 * highlight-card sections.
 *
 * - Inner content keeps its raw markdown (headings, `{% embed %}`, text).
 * - Tags inside fenced code blocks are left untouched.
 * - Unclosed `{% card %}` stays in a markdown section (safe fallback).
 * - Empty cards are dropped.
 */
export const splitCardSections = (value: string): CardSection[] => {
	if (!value.includes("{%")) {
		return value.length > 0 ? [{ type: "markdown", content: value }] : [];
	}
	const raw = splitOutsideCode(value, splitChunk);
	const merged: CardSection[] = [];
	for (const section of raw) {
		if (section.content.trim().length === 0 && section.type === "markdown") {
			continue;
		}
		const prev = merged[merged.length - 1];
		if (prev && prev.type === "markdown" && section.type === "markdown") {
			prev.content += section.content;
		} else {
			merged.push({ ...section });
		}
	}
	return merged;
};
