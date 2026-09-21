import type { MarkedStyles } from "react-native-marked/dist/typescript/theme/types";
import type { MD3Theme } from "react-native-paper";
import getMarkdownTheme from "./theme";

const getMarkdownStyles = (theme: MD3Theme): MarkedStyles => {
	const mdBorder =
		getMarkdownTheme(theme).colors?.border ?? theme.colors.outline;
	return {
		em: {
			...theme.fonts.bodyLarge,
		},
		strong: {
			...theme.fonts.titleMedium,
		},
		strikethrough: {
			...theme.fonts.bodyLarge,
		},
		text: {
			...theme.fonts.bodyLarge,
		},
		link: {
			...theme.fonts.bodyLarge,
		},
		blockquote: {
			// react-native-marked dims quotes to 0.8 opacity; keep full
			// opacity so quote text keeps body-text contrast.
			opacity: 1,
		},
		h1: {
			...theme.fonts.headlineLarge,
		},
		h2: {
			...theme.fonts.headlineMedium,
		},
		h3: {
			...theme.fonts.headlineSmall,
		},
		h4: {
			...theme.fonts.titleLarge,
		},
		h5: {
			...theme.fonts.titleMedium,
		},
		h6: {
			...theme.fonts.titleSmall,
		},
		codespan: {
			...theme.fonts.bodyLarge,
			// Library default is italic + weight 300. No gray fill is used,
			// so render upright inside an outlined chip instead.
			fontStyle: "normal",
			borderWidth: 1,
			borderColor: mdBorder,
			borderRadius: 4,
			paddingHorizontal: 4,
		},
		li: {
			...theme.fonts.bodyLarge,
		},
	};
};

export default getMarkdownStyles;
