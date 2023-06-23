import { LANG_ALIAS_MAP } from "./const";
import { logError } from "./log";
import { replaceNewlines } from "./string";
import Domino from "domino";
import FrontMatter from "front-matter";
import { escape as escapeHTML, unescape as unescapeHTML } from "html-escaper";
import TurndownService from "turndown";

let turndownService: TurndownService;
const getTurndownService = (options?: TurndownService.Options) => {
	if (!turndownService) {
		TurndownService.prototype.escape = (string) => {
			// Disables string escaping
			// ref: https://github.com/mixmark-io/turndown#overriding-turndownserviceprototypeescape
			return string;
		};

		turndownService = new TurndownService(options);
	}

	return turndownService;
};

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
		return fixTurndownEscaping(getTurndownService().turndown(document).trim());
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

	// Add new line before and after embeds to ensure it gets picked up by the tokenizer
	mdProcessed = mdProcessed.replace(/([*]?{%)/, "\n$1");
	mdProcessed = mdProcessed.replace(/(%}[*]?)/, "$1\n");

	// Check if markdown contains html tags, if found transform them to Markdown
	// This function has caveat, it'll return true if a code block contains some html
	if (/<\/?[a-z][\s\S]*>/gim.test(mdProcessed)) {
		mdProcessed = convertHtmlInMarkdownToMarkdown(
			prepareTurndownContent(mdProcessed),
		);
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

// Escapes HTML to avoid turndown parsing
export const prepareTurndownContent = (md: string): string => {
	let processed = unescapeHTML(md);
	const codeFenceRegex = new RegExp(/`+\n[\s\S]+?```/gm);
	const matches = md.match(codeFenceRegex);
	if (!matches) {
		return processed;
	}

	matches.forEach(function (match) {
		if (/<\/?[a-z][\s\S]*>/gim.test(match)) {
			processed = md.replace(match.trim(), escapeHTML(match));
		}
	});

	return processed;
};
