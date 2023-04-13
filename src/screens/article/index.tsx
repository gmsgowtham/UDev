import { FunctionComponent, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Markdown, { Renderer, RendererInterface } from "react-native-marked";
import { StyledView } from "../../zephyr/styled";
import { StackParamList } from "../../router/types";
import { useArticleStore } from "../../store/articles";
import MDRenderer from "../../components/markdown/renderer";
type Props = NativeStackScreenProps<StackParamList, "Article">;

const ArticleScreen: FunctionComponent<Props> = ({ route }) => {
	const { params } = route;
	const { id } = params;

	const { article, fetchArticle, fetching } = useArticleStore(
		(state) => ({
			article: state.article,
			fetchArticle: state.fetchArticle,
			fetching: state.fetching,
		}),
		shallow,
	);

	useEffect(() => {
		fetchArticle(id);
	}, []);

	return (
		<StyledView classes={["flex:1"]}>
			{!fetching && article?.body_markdown && (
				<Markdown
					value={article?.body_markdown}
					flatListProps={{
						contentContainerStyle: {
							margin: 8,
							padding: 4,
						},
					}}
					renderer={MDRenderer}
				/>
			)}
		</StyledView>
	);
};

export default ArticleScreen;
