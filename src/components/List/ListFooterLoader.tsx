import React, { memo, type FunctionComponent } from "react";
import { ActivityIndicator, View } from "react-native";

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
