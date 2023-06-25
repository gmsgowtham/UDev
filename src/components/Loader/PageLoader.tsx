import { memo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

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
