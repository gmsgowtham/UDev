import { FunctionComponent, useEffect } from "react";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Markdown from "react-native-marked";
import { StackParamList } from "../../router/types";
import { useArticleStore } from "../../store/articles";
import MDRenderer from "../../components/markdown/renderer";
import { useTheme } from "react-native-paper";
type Props = NativeStackScreenProps<StackParamList, "Article">;

const ArticleScreen: FunctionComponent<Props> = ({ route }) => {
	const { params } = route;
	const { id } = params;
	const theme = useTheme();

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
		<View style={{ flex: 1 }}>
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
					styles={{
						container: {
							backgroundColor: theme.colors.background,
						},
					}}
				/>
			)}
		</View>
	);
};

export default ArticleScreen;
