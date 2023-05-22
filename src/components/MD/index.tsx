import { FunctionComponent, memo } from "react";
import Markdown from "react-native-marked";
import { useTheme } from "react-native-paper";
import renderer from "./renderer";
import tokenizer from "./tokenizer";
import { styles } from "./styles";

interface MarkdownRendererProps {
	HeaderComponent?: () => React.JSX.Element | null;
	value?: string;
}

const RenderMarkdown: FunctionComponent<MarkdownRendererProps> = ({
	value = "",
	HeaderComponent,
}) => {
	const theme = useTheme();
	return (
		<Markdown
			value={value}
			flatListProps={{
				contentContainerStyle: styles.mdContainer,
				style: {
					backgroundColor: theme.colors.background,
				},
				ListHeaderComponent: HeaderComponent,
			}}
			renderer={renderer}
			tokenizer={tokenizer}
			theme={{
				colors: {
					background: theme.colors.background,
					code: theme.colors.elevation.level2,
					link: theme.colors.primary,
					text: theme.colors.onBackground,
					border: theme.colors.secondary,
				},
			}}
		/>
	);
};

export default memo(RenderMarkdown);
