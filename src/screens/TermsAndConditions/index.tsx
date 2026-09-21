import { useRouter } from "expo-router";
import type { FunctionComponent } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import RenderMarkdownDefault from "../../components/Markdown/Default";
import TERM_AND_CONDITION_MARKDOWN from "./md";

const TermsAndConditionsScreen: FunctionComponent = () => {
	const router = useRouter();
	const theme = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
			<Appbar.Header
				elevated={false}
				style={[
					styles.header,
					{
						backgroundColor: theme.colors.surface,
						borderBottomColor: theme.colors.outlineVariant,
					},
				]}
			>
				<Appbar.BackAction onPress={() => router.back()} />
				<Appbar.Content title="Terms & Conditions" />
			</Appbar.Header>
			<RenderMarkdownDefault value={TERM_AND_CONDITION_MARKDOWN} />
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		borderBottomWidth: 1,
	},
	container: {
		marginBottom: 60,
	},
});

export default TermsAndConditionsScreen;
