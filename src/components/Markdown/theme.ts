import type { UserTheme } from "react-native-marked/dist/typescript/theme/types";
import type { MD3Theme } from "react-native-paper";

const getMarkdownTheme = (theme: MD3Theme): UserTheme => {
	// No gray fills: code blocks and inline code sit on the article surface
	// and are delineated by borders. `border` drives blockquote bars, h1/h2
	// underlines, hrs and table borders, so it uses the darker dev.to grey
	// (grey-300) in light mode for visible contrast.
	const isDark = theme.dark;
	return {
		colors: {
			background: theme.colors.surface,
			code: theme.colors.surface,
			link: theme.colors.primary,
			text: theme.colors.onSurface,
			border: isDark ? theme.colors.outline : "#E3E3E0",
		},
	};
};

export default getMarkdownTheme;
