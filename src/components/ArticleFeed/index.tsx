import {
	FlashList,
	FlashListProps,
	type ListRenderItem,
} from "@shopify/flash-list";
import { forwardRef, memo } from "react";
import { ApiArticleFeedItem } from "../../api/types";
import ArticleFeedItem from "../ArticleFeedItem";

type Props = {
	data: ApiArticleFeedItem[];
	onItemClick: (id: number) => void;
	listProps?: Omit<
		FlashListProps<ApiArticleFeedItem>,
		"renderItem" | "data" | "estimatedItemSize"
	>;
};

const ArticleFeed = forwardRef<FlashList<ApiArticleFeedItem>, Props>(
	(props, ref) => {
		const { data, onItemClick, listProps = {} } = props;

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
					organizationName={item.organization?.name}
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
	},
);

export default memo(ArticleFeed);
