import fm from "front-matter";
import TurndownService from "turndown";
import Domino from "domino";
import { HTML_FINDER_REGEX } from "./const";

TurndownService.prototype.escape = (string) => {
	// Disables string escaping
	// ref: https://github.com/mixmark-io/turndown#overriding-turndownserviceprototypeescape
	return string;
};

const turndownService = new TurndownService();

export const stripMetaData = (markdown: string): string => {
	const content = fm(markdown);
	return content.body;
};

export const convertHtmlInMarkdownToMarkdown = (markdown: string): string => {
	try {
		const withBR = markdown.replace(/(?:\r\n|\r|\n)/gm, "<br/>");
		const document = Domino.createDocument(withBR, true);
		const output = fixTurndownEscaping(
			turndownService.turndown(document).trim(),
		);
		return output;
	} catch (e) {
		return markdown;
	}
};

export const fixTurndownEscaping = (markdown: string): string => {
	return markdown.replace(/[^\S\r\n]+$/gm, ""); // Replaces " \n" with "\n"
};

export const processMarkdownContent = (markdown: string): string => {
	console.log(markdown);
	let mdProcessed = markdown.trim();
	// Check if markdown contains metadata information, if found strip the metadata
	if (mdProcessed.startsWith("---")) {
		mdProcessed = stripMetaData(mdProcessed);
	}

	// Check if markdown contains html tags, if found transform them to markdown
	// This function has caveat, it'll return true if a codeblock contains some html
	if (HTML_FINDER_REGEX.test(mdProcessed)) {
		mdProcessed = convertHtmlInMarkdownToMarkdown(mdProcessed);
	}

	return mdProcessed;
};
