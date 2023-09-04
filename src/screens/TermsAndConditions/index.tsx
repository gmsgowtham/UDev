import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FunctionComponent } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { RenderMarkdownDefault } from "../../components/Markdown";
import { StackParamList } from "../../router/types";
import TERM_AND_CONDITION_MARKDOWN from "./md";

type Props = NativeStackScreenProps<StackParamList, "TermsAndConditions">;

const TermsAndConditionsScreen: FunctionComponent<Props> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Appbar.Header elevated>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
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
