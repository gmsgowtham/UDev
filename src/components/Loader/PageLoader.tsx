import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const PageLoader = () => {
	return (
		<View style={styles.loadingContainer}>
			<ActivityIndicator size={"large"} />
		</View>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default memo(PageLoader);
