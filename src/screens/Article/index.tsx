import { FunctionComponent, useCallback } from "react";
import { Linking, Share, StyleSheet, View } from "react-native";
import { shallow } from "zustand/shallow";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Markdown from "react-native-marked";
import { StackParamList } from "../../router/types";
import useArticleStore from "../../store/articles/article";
import MDRenderer from "../../components/markdown/renderer";
import { Appbar, useTheme } from "react-native-paper";
import PageLoader from "../../components/Loader/PageLoader";
import { useFocusEffect } from "@react-navigation/native";
import ArticleCover from "../../components/ArticleCover";
type Props = NativeStackScreenProps<StackParamList, "Article">;

const ArticleScreen: FunctionComponent<Props> = ({ route, navigation }) => {
	const { params } = route;
	const { id, title, url } = params;
	const theme = useTheme();

	const { article, loading, fetchArticle, resetArticle } = useArticleStore(
		(state) => ({
			article: state.article,
			fetchArticle: state.fetchArticle,
			resetArticle: state.reset,
			loading: state.loading,
		}),
		shallow,
	);

	useFocusEffect(
		useCallback(() => {
			fetchArticle(id);

			return () => {
				// Resets article state
				resetArticle();
			};
		}, []),
	);

	const onBackActionPress = () => {
		navigation.goBack();
	};

	const onShareActionPress = async () => {
		try {
			const result = await Share.share({
				message: url,
				url: url,
				title: title,
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: unknown) {
			console.log(error);
		}
	};

	const onOpenInBrowserActionPress = async () => {
		await Linking.openURL(url);
	};

	const renderListHeaderComponent = () => {
		return (
			<ArticleCover
				title={title}
				cover={{
					uri: article?.cover_image,
					aspectRatio: article?.cover_image_aspect_ratio,
				}}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<Appbar.Header elevated>
				<Appbar.BackAction onPress={onBackActionPress} />
				<Appbar.Content title={""} />
				<Appbar.Action
					icon="earth"
					onPress={onOpenInBrowserActionPress}
					accessibilityHint="Open in browser"
					accessibilityLabel="Open in browser"
				/>
				<Appbar.Action
					icon="share"
					onPress={onShareActionPress}
					accessibilityHint="Share post"
					accessibilityLabel="Share post"
				/>
			</Appbar.Header>

			{!loading ? (
				typeof article?.body_markdown !== "undefined" && (
					<Markdown
						value={article?.body_markdown}
						flatListProps={{
							contentContainerStyle: styles.listContainer,
							style: {
								backgroundColor: theme.colors.background,
							},
							ListHeaderComponent: renderListHeaderComponent,
						}}
						renderer={MDRenderer}
						theme={{
							colors: {
								background: theme.colors.background,
								code: theme.colors.elevation.level2,
								link: theme.colors.primary,
								text: theme.colors.onBackground,
								border: theme.colors.primary,
							},
						}}
					/>
				)
			) : (
				<PageLoader />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContainer: {
		margin: 8,
		padding: 4,
		paddingBottom: 24,
	},
});

export default ArticleScreen;
