import { ApiArticleFeedItem } from "../../api/types";
import ArticleFeedItem from "../ArticleFeedItem";
import { useScrollToTop } from "@react-navigation/native";
import {
	FlashList,
	FlashListProps,
	type ListRenderItem,
} from "@shopify/flash-list";
import { FunctionComponent, memo, useRef } from "react";

type ArticleFeed = {
	data: ApiArticleFeedItem[];
	onItemClick: (id: number) => void;
	listProps?: Omit<
		FlashListProps<ApiArticleFeedItem>,
		"renderItem" | "data" | "estimatedItemSize"
	>;
};

const ArticleFeed: FunctionComponent<ArticleFeed> = ({
	data,
	onItemClick,
	listProps = {},
}) => {
	const ref = useRef(null);

	// Ref: https://reactnavigation.org/docs/use-scroll-to-top
	useScrollToTop(ref);

	const renderItem: ListRenderItem<ApiArticleFeedItem> = ({
		item,
	}: { item: ApiArticleFeedItem }) => {
		return (
			<ArticleFeedItem
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
				tags={item.tag_list}
			/>
		);
	};

	return (
		<FlashList
			ref={ref}
			showsVerticalScrollIndicator={false}
			{...listProps}
			data={data}
			renderItem={renderItem}
			estimatedItemSize={377}
		/>
	);
};

export default memo(ArticleFeed);
