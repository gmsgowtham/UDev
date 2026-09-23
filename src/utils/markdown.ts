import FrontMatter from "front-matter";
import { escape as escapeHTML, unescape as unescapeHTML } from "html-escaper";
import { parseHTML } from "linkedom";
import TurndownService from "turndown";
import { LANG_ALIAS_MAP } from "./const";
import { logError } from "./log";
import { replaceNewlines } from "./string";

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
	let processed = unescapeHTML(markdown);
	processed = markdown.replace(/&nbsp;/gm, " "); // Replaces &nbsp; with space
	processed = processed.replace(/[^\S\r\n]+$/gm, ""); // Replaces " \n" with "\n"
	return processed;
};

const TOC_HEADING_PATTERN =
	/^#{1,6}\s*[*_~]*\s*(table\s+of\s+contents?|toc)\s*[*_~:]*\s*$/i;
const TOC_HTML_HEADING_PATTERN =
	/^<h[1-6][^>]*>\s*(table\s+of\s+contents?|toc)\s*<\/h[1-6]>\s*$/i;
const TOC_MARKER_START_PATTERN = /<!--\s*toc\s*-->/i;
const TOC_MARKER_END_PATTERN = /<!--\s*tocstop\s*-->/i;
const TOC_LIQUID_PATTERN = /^[*]?\s*{%\s*toc\s*%}\s*[*]?\s*$/i;
const TOC_SINGLE_MARKER_PATTERN = /^\s*\[{1,2}toc\]{1,2}\s*$/i;
const TOC_ANCHOR_LINK_PATTERN = /\[[^\]]+\]\([^)]*#[^)]*\)/;
const TOC_LIST_ITEM_PATTERN = /^\s*(?:[-*+]\s+|\d+[.)]\s+)/;
const TOC_BREAK_PATTERN = /^\s*(?:---+|\*\*\*+|___+)\s*$/;
const MD_HEADING_PATTERN = /^#{1,6}\s+\S/;
const FENCE_PATTERN = /^\s*(```|~~~)/;

/**
 * Removes table-of-contents blocks from article markdown.
 *
 * Authors typically add a `## Table of Contents` heading followed by a list
 * of in-page anchor links (`[Section](#anchor)`). Those anchors have no
 * target in the app renderer, so the TOC is dead weight — strip the heading
 * plus its link list (and an optional trailing `---` rule).
 *
 * Also drops TOC markers that would otherwise leak into rendered output:
 * `{% toc %}`, `[TOC]`, and `<!-- toc -->...<!-- tocstop -->` blocks.
 * Fenced code blocks are left untouched.
 */
export const stripTableOfContents = (markdown: string): string => {
	if (!markdown) return markdown;
	if (!/toc|table of contents?|\[toc\]/i.test(markdown)) return markdown;

	const lines = markdown.split("\n");
	const out: string[] = [];
	let inFence = false;
	let i = 0;

	while (i < lines.length) {
		const line = lines[i];
		if (FENCE_PATTERN.test(line)) {
			inFence = !inFence;
			out.push(line);
			i++;
			continue;
		}
		if (inFence) {
			out.push(line);
			i++;
			continue;
		}

		if (TOC_LIQUID_PATTERN.test(line) || TOC_SINGLE_MARKER_PATTERN.test(line)) {
			i++;
			continue;
		}
		if (TOC_MARKER_END_PATTERN.test(line)) {
			i++;
			continue;
		}
		if (TOC_MARKER_START_PATTERN.test(line)) {
			let j = i + 1;
			let found = false;
			while (j < lines.length) {
				if (TOC_MARKER_END_PATTERN.test(lines[j])) {
					found = true;
					break;
				}
				j++;
			}
			i = found ? j + 1 : i + 1;
			continue;
		}

		const trimmed = line.trim();
		if (
			TOC_HEADING_PATTERN.test(trimmed) ||
			TOC_HTML_HEADING_PATTERN.test(trimmed)
		) {
			let k = i + 1;
			let end = k;
			let anchorItems = 0;
			while (k < lines.length) {
				const cur = lines[k];
				if (FENCE_PATTERN.test(cur)) break;
				const curTrimmed = cur.trim();
				if (curTrimmed === "") {
					k++;
					continue;
				}
				if (
					TOC_MARKER_START_PATTERN.test(cur) ||
					TOC_MARKER_END_PATTERN.test(cur) ||
					TOC_LIQUID_PATTERN.test(cur) ||
					TOC_SINGLE_MARKER_PATTERN.test(cur) ||
					TOC_BREAK_PATTERN.test(cur)
				) {
					k++;
					end = k;
					continue;
				}
				if (TOC_LIST_ITEM_PATTERN.test(cur)) {
					if (TOC_ANCHOR_LINK_PATTERN.test(cur)) anchorItems++;
					k++;
					end = k;
					continue;
				}
				if (MD_HEADING_PATTERN.test(curTrimmed)) break;
				break;
			}
			if (anchorItems >= 1) {
				while (end < lines.length && lines[end].trim() === "") end++;
				if (end < lines.length && TOC_BREAK_PATTERN.test(lines[end])) {
					end++;
					while (end < lines.length && lines[end].trim() === "") end++;
				}
				i = end;
				continue;
			}
			out.push(line);
			i++;
			continue;
		}

		out.push(line);
		i++;
	}

	return out.join("\n");
};

export const processMarkdownContent = (markdown: string): string => {
	let mdProcessed = markdown.trim();
	// Check if markdown contains metadata information, if found strip the metadata
	if (mdProcessed.startsWith("---")) {
		mdProcessed = stripMetaData(mdProcessed);
	}

	mdProcessed = stripTableOfContents(mdProcessed);

	// Add new line before and after embeds to ensure it gets picked up by the tokenizer
	mdProcessed = mdProcessed.replace(/([*]?{%)/gm, "\n\n$1");
	mdProcessed = mdProcessed.replace(/(%}[*]?)/gm, "$1\n\n");
	// Embed edge cases
	mdProcessed = mdProcessed.replace("{%embed", "{% embed");
	// Remove html comments
	mdProcessed = mdProcessed.replace(/<!--([\s\S]*?)-->/gm, "");

	// Check if markdown contains html tags, if found transform them to Markdown
	// This function has caveat, it'll return true if a code block contains some html
	if (/<\/?[a-z][\s\S]*>/gim.test(mdProcessed)) {
		mdProcessed = convertHtmlInMarkdownToMarkdown(
			prepareTurndownContent(mdProcessed),
		);
		mdProcessed = stripTableOfContents(mdProcessed);
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
	const codeFenceRegex = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;

	const codeFenceMatches = processed.match(codeFenceRegex);
	if (codeFenceMatches) {
		for (const match of codeFenceMatches) {
			// To preserve spacing, ref: https://github.com/mixmark-io/turndown/issues/361
			const valueToReplace = escapeHTML(match.replace(/ /gm, "&nbsp;"));
			processed = processed.replace(match, valueToReplace);
		}
	}

	const codeSpanRegex = /`([^\`].*?)`/gm;
	const codeSpanMatches = processed.match(codeSpanRegex);
	if (codeSpanMatches) {
		for (const match of codeSpanMatches) {
			processed = processed.replace(match, escapeHTML(match));
		}
	}

	processed = replaceNewlines(processed, "<br/>");
	return processed;
};
