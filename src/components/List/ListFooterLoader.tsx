import React, { type FunctionComponent, memo } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface Props {
	loading: boolean;
}

const ListFooterLoader: FunctionComponent<Props> = ({ loading }) => {
	if (loading) {
		return (
			<View>
				<ActivityIndicator size="small" />
			</View>
		);
	}

	return null;
};

export default memo(ListFooterLoader);
