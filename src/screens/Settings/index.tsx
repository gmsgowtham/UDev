import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Fragment, type FunctionComponent, memo, useState } from "react";
import { Linking, View } from "react-native";
import { StyleSheet } from "react-native";
import { getVersion } from "react-native-device-info";
import { Appbar, Divider, List, Text } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeSwitcher from "../../components/Modal/ThemeSwitcher";
import { useUserColorSchemeMMKV } from "../../mmkv/colorScheme";
import type { StackParamList } from "../../router/types";
import { CONTACT_EMAIL, PRIVACY_POLICY_URL, REPO_URL } from "../../utils/const";
import { toTitleCase } from "../../utils/string";

type Props = NativeStackScreenProps<StackParamList, "Settings">;

const version = getVersion();

const SettingsScreen: FunctionComponent<Props> = ({ navigation }) => {
	const [userColorScheme, setUserColorScheme] = useUserColorSchemeMMKV();
	const [visible, setVisible] = useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const onThemeSelectPress = (itemValue: string) => {
		hideModal();
		setUserColorScheme(itemValue);
	};

	const onGithubItemPress = () => {
		Linking.openURL(REPO_URL);
	};

	const onContactUsItemPress = () => {
		Linking.openURL(`mailto:${CONTACT_EMAIL}`);
	};

	const onTermsAndConditionsItemPress = () => {
		navigation.navigate("TermsAndConditions");
	};

	const onPrivacyPolicyItemPress = () => {
		Linking.openURL(PRIVACY_POLICY_URL);
	};

	return (
		<Fragment>
			<Appbar.Header elevated>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title="Settings" />
			</Appbar.Header>
			<View style={styles.list}>
				<List.Section>
					<List.Subheader>Appearance</List.Subheader>
					<List.Item
						title="Theme"
						description={toTitleCase(userColorScheme)}
						left={() => <List.Icon icon="palette" />}
						onPress={showModal}
						style={styles.item}
					/>
				</List.Section>
				<Divider />
				<List.Section>
					<List.Subheader>Support</List.Subheader>
					<List.Item
						title="Terms & Conditions"
						left={() => <List.Icon icon="security" />}
						onPress={onTermsAndConditionsItemPress}
						style={styles.item}
					/>
					<List.Item
						title="Privacy Policy"
						left={() => <List.Icon icon="privacy-tip" />}
						right={() => <List.Icon icon="launch" />}
						onPress={onPrivacyPolicyItemPress}
						style={styles.item}
					/>
					<List.Item
						title="Github"
						left={() => (
							<List.Icon
								icon={(props) => (
									<MaterialCommunityIcon {...props} name="github" />
								)}
							/>
						)}
						right={() => <List.Icon icon="launch" />}
						onPress={onGithubItemPress}
						style={styles.item}
					/>
					<List.Item
						title="Contact us"
						left={() => <List.Icon icon="email" />}
						right={() => <List.Icon icon="launch" />}
						onPress={onContactUsItemPress}
						style={styles.item}
					/>
				</List.Section>
			</View>
			<View style={styles.footer}>
				<Text variant="labelSmall">Version: {version}</Text>
			</View>
			<ThemeSwitcher
				visible={visible}
				onThemeSelectPress={onThemeSelectPress}
				onDismiss={hideModal}
			/>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
	},
	footer: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	item: {
		paddingLeft: 16,
	},
});

export default memo(SettingsScreen);
