import { useMemo } from "react";
import type { useMarkdownHookOptions } from "react-native-marked";
import { useTheme } from "react-native-paper";
import renderer from "./renderer";
import getMarkdownStyles from "./styles";
import getMarkdownTheme from "./theme";
import tokenizer from "./tokenizer";

export const useMarkdownOptions = (): useMarkdownHookOptions => {
	const theme = useTheme();

	return useMemo(() => {
		return {
			renderer: renderer,
			tokenizer: tokenizer,
			theme: getMarkdownTheme(theme),
			styles: getMarkdownStyles(theme),
		};
	}, [theme]);
};
