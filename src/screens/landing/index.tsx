import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { shallow } from "zustand/shallow";
import Card from "../../components/card";
import { StyledView } from "../../zephyr/styled";
import hr from "../../components/hr";
import { useArticleListStore } from "../../store/articles";
import { FunctionComponent, useEffect } from "react";
import { ArticleListItem } from "../../store/types";
import { StackParamList } from "../../router/types";

type Props = NativeStackScreenProps<StackParamList, "Landing">;

const LandingScreen: FunctionComponent<Props> = ({ navigation }) => {
	const { articles, fetchArticles } = useArticleListStore(
		(state) => ({
			articles: state.articles,
			fetchArticles: state.fetchArticles,
		}),
		shallow,
	);

	useEffect(() => {
		fetchArticles();
	}, []);

	const onItemClick = (id: number, title: string) => {
		navigation.navigate("Article", {
			id: id,
		});
	};

	const renderItem: ListRenderItem<ArticleListItem> = ({ item }) => {
		return (
			<Card
				id={item.id}
				title={item.title}
				description={item.description}
				dateReadable={item.readable_publish_date}
				coverImageUri={item.cover_image}
				author={{
					name: item.user.name,
					imageUri: item.user.profile_image_90,
				}}
				onItemClick={onItemClick}
			/>
		);
	};

	return (
		<StyledView classes={["p:2", "flex:1"]}>
			<FlashList
				data={articles}
				renderItem={renderItem}
				estimatedItemSize={400}
				ItemSeparatorComponent={hr}
			/>
		</StyledView>
	);
};

export default LandingScreen;
