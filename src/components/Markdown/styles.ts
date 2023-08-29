import { MarkedStyles } from "react-native-marked/dist/typescript/theme/types";
import { MD3Theme } from "react-native-paper";

const getMarkdownStyles = (theme: MD3Theme): MarkedStyles => {
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
		},
		li: {
			...theme.fonts.bodyLarge,
		},
	};
};

export default getMarkdownStyles;
