import { FunctionComponent, memo, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";

const DevEmbed: FunctionComponent<PropsWithChildren> = ({ children }) => {
	return (
		<Surface style={styles.container} mode="flat">
			{children}
		</Surface>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 4,
		borderRadius: 4,
		marginVertical: 8,
	},
});

export default memo(DevEmbed);
