import { LANG_ALIAS_MAP } from "./const";
import { logError } from "./log";
import { replaceNewlines } from "./string";
import FrontMatter from "front-matter";
import { escape as escapeHTML, unescape as unescapeHTML } from "html-escaper";
import { parseHTML } from "linkedom";
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
		const { document } = parseHTML(`<html><body>${markdown}</body></html>`);
		return fixTurndownConversion(
			getTurndownService().turndown(document.body).trim(),
		);
	} catch (e) {
		logError(e as Error, "fn: convertHtmlInMarkdownToMarkdown exception");
		return markdown;
	}
};

export const fixTurndownConversion = (markdown: string): string => {
	// Restores the original content state of content after peforming `prepareTurndownContent`
	let processed = markdown.replace(/\u00a0/g, " "); // Replaces \u00a0 with space
	processed = processed.replace(/[^\S\r\n]+$/gm, ""); // Replaces " \n" with "\n"
	return unescapeHTML(processed);
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

	// Remove html comments
	mdProcessed = mdProcessed.replace(/<!--(.*?)-->/gm, "");

	// Check if markdown contains html tags, if found transform them to Markdown
	// This function has caveat, it'll return true if a code block contains some html
	if (/<\/?[a-z][\s\S]*>/gim.test(mdProcessed)) {
		mdProcessed = convertHtmlInMarkdownToMarkdown(
			prepareTurndownContent(mdProcessed),
		);
	}

	return mdProcessed;
};

export const getActualLangForCodeSnippet = (alias?: string): string => {
	if (!alias) return "code";
	return LANG_ALIAS_MAP[alias] ?? alias;
};

// Returns abs url from anchor markdown
// i.e.
// Input [Example URL](https://www.example.com)
// Output https://www.example.com
export const getAbsURLFromAnchorMarkdown = (md: string) => {
	return md.replace(/\[.*?\]/g, "").replace(/\(|\)/g, "");
};

// Escapes HTML inside code fence and code span to avoid turndown parsing
export const prepareTurndownContent = (md: string): string => {
	let processed = unescapeHTML(md);
	const codeFenceRegex = new RegExp(
		"```([\\s\\S])+\\n(?:(?!```)[\\s\\S])+```",
		"gm",
	);
	const codeFenceMatches = processed.match(codeFenceRegex);
	if (codeFenceMatches) {
		codeFenceMatches.forEach(function (match) {
			processed = processed.replace(match, escapeHTML(match));
		});
	}

	const codeSpanRegex = new RegExp("`([^\\`].*?)`", "gm");
	const codeSpanMatches = processed.match(codeSpanRegex);
	if (codeSpanMatches) {
		codeSpanMatches.forEach(function (match) {
			processed = processed.replace(match, escapeHTML(match));
		});
	}

	// To preserve spacing, ref: https://github.com/mixmark-io/turndown/issues/361
	processed = processed.replace(/ /g, "\u00a0");
	processed = replaceNewlines(processed, "<br/>");
	return processed;
};
