import FrontMatter from "front-matter";
import TurndownService from "turndown";
import Domino from "domino";
import { replaceNewlines } from "./string";
import { logError } from "./log";
import { LANG_ALIAS_MAP } from "./const";

TurndownService.prototype.escape = (string) => {
	// Disables string escaping
	// ref: https://github.com/mixmark-io/turndown#overriding-turndownserviceprototypeescape
	return string;
};

const turndownService = new TurndownService();

export const stripMetaData = (markdown: string): string => {
	try {
		return FrontMatter(markdown).body;
	} catch (e) {
		logError(e as Error, "fn: stripMetaData exception");
		return markdown.replace(/^---[\s\S]*---/gm, "").trim();
	}
};

export const convertHtmlInMarkdownToMarkdown = (markdown: string): string => {
	try {
		const withBR = replaceNewlines(markdown, "<br/>");
		const document = Domino.createDocument(withBR, true);
		return fixTurndownEscaping(turndownService.turndown(document).trim());
	} catch (e) {
		logError(e as Error, "fn: convertHtmlInMarkdownToMarkdown exception");
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

export const getActualLangForCodeSnippet = (
	alias?: string,
): string | undefined => {
	if (!alias) return undefined;
	return LANG_ALIAS_MAP[alias] ?? alias;
};

// Returns abs url from anchor markdown
// i.e.
// Input [Example URL](https://www.example.com)
// Output https://www.example.com
export const getAbsURLFromAnchorMarkdown = (md: string) => {
	return md.replace(/\[.*?\]/g, "").replace(/\(|\)/g, "");
};
