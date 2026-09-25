import {
	LegendList,
	type LegendListProps,
	type LegendListRef,
	type LegendListRenderItemProps,
} from "@legendapp/list/react-native";
import { forwardRef, memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import type { ApiArticleFeedItem } from "../../api/types";
import ArticleFeedItem from "../ArticleFeedItem";

type Props = {
	data: ApiArticleFeedItem[];
	onItemClick: (id: number) => void;
	listProps?: Omit<LegendListProps<ApiArticleFeedItem>, "renderItem" | "data">;
};

const FeedSeparator = () => <View style={styles.separator} />;

const keyExtractor = (item: ApiArticleFeedItem) => String(item.id);

const ArticleFeed = forwardRef<LegendListRef, Props>((props, ref) => {
	const { data, onItemClick, listProps = {} } = props;

	const renderItem = useCallback(
		({ item }: LegendListRenderItemProps<ApiArticleFeedItem>) => {
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
					reactionsCount={item.public_reactions_count}
					commentsCount={item.comments_count}
					readingTimeMinutes={item.reading_time_minutes}
				/>
			);
		},
		[onItemClick],
	);

	return (
		<LegendList
			ref={ref}
			showsVerticalScrollIndicator={false}
			{...listProps}
			data={data}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			estimatedItemSize={300}
			ItemSeparatorComponent={FeedSeparator}
		/>
	);
});

const styles = StyleSheet.create({
	separator: {
		height: 8,
		backgroundColor: "transparent",
	},
});

export default memo(ArticleFeed);
