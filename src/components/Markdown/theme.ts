import { UserTheme } from "react-native-marked/dist/typescript/theme/types";
import { MD3Theme } from "react-native-paper";

const getMarkdownTheme = (theme: MD3Theme): UserTheme => {
	return {
		colors: {
			background: theme.colors.background,
			code: theme.colors.elevation.level2,
			link: theme.colors.primary,
			text: theme.colors.onBackground,
			border: theme.colors.outlineVariant,
		},
	};
};

export default getMarkdownTheme;
