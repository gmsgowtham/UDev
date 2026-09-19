import { useRouter } from "expo-router";
import type { FunctionComponent } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import RenderMarkdownDefault from "../../components/Markdown/Default";
import TERM_AND_CONDITION_MARKDOWN from "./md";

const TermsAndConditionsScreen: FunctionComponent = () => {
	const router = useRouter();
	return (
		<View style={styles.container}>
			<Appbar.Header elevated>
				<Appbar.BackAction onPress={() => router.back()} />
				<Appbar.Content title="Terms & Conditions" />
			</Appbar.Header>
			<RenderMarkdownDefault value={TERM_AND_CONDITION_MARKDOWN} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 60,
	},
});

export default TermsAndConditionsScreen;
