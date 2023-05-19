import FrontMatter from "front-matter";
import TurndownService from "turndown";
import Domino from "domino";
import { replaceNewlines } from "./string";

TurndownService.prototype.escape = (string) => {
	// Disables string escaping
	// ref: https://github.com/mixmark-io/turndown#overriding-turndownserviceprototypeescape
	return string;
};

const turndownService = new TurndownService();

export const stripMetaData = (markdown: string): string => {
	const content = FrontMatter(markdown);
	return content.body;
};

export const convertHtmlInMarkdownToMarkdown = (markdown: string): string => {
	try {
		const withBR = replaceNewlines(markdown, "<br/>");
		const document = Domino.createDocument(withBR, true);
		return fixTurndownEscaping(turndownService.turndown(document).trim());
	} catch (e) {
		return markdown;
	}
};

export const fixTurndownEscaping = (markdown: string): string => {
	return markdown.replace(/[^\S\r\n]+$/gm, ""); // Replaces " \n" with "\n"
};

export const processMarkdownContent = (markdown: string): string => {
	let mdProcessed = markdown.trim();
	// Check if markdown contains metadata information, if found strip the metadata
	if (mdProcessed.startsWith("---")) {
		mdProcessed = stripMetaData(mdProcessed);
	}

	// Check if markdown contains html tags, if found transform them to Markdown
	// This function has caveat, it'll return true if a code block contains some html
	if (/<\/?[a-z][\s\S]*>/gim.test(mdProcessed)) {
		mdProcessed = convertHtmlInMarkdownToMarkdown(mdProcessed);
	}

	return mdProcessed;
};
