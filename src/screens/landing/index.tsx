import React from "react";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { data } from "../../utils/const";
import Card from "../../components/card";
import { StyledView } from "../../zephyr/styled";

const ItemSeparator = () => (
	<StyledView classes={["border-b:hairline", "border-color:gray-300"]} />
);

const LandingScreen = () => {
	const renderItem: ListRenderItem<typeof data[0]> = ({ item }) => {
		return (
			<Card
				title={item.title}
				description={item.description}
				dateReadable={item.readable_publish_date}
				coverImageUri={item.cover_image}
				author={{
					name: item.user.name,
					imageUri: item.user.profile_image_90,
				}}
			/>
		);
	};

	return (
		<StyledView classes={["p:2", "flex:1"]}>
			<FlashList
				data={data}
				renderItem={renderItem}
				estimatedItemSize={400}
				ItemSeparatorComponent={ItemSeparator}
			/>
		</StyledView>
	);
};

export default LandingScreen;
