import { THEME_VALUES, useUserColorScheme } from "../../mmkv/colorScheme";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { FunctionComponent, memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import {
	Button,
	Divider,
	Drawer,
	Modal,
	Portal,
	Text,
	useTheme,
} from "react-native-paper";

const CustomDrawer: FunctionComponent<DrawerContentComponentProps> = ({
	navigation,
}) => {
	const [userColorScheme, setUserColorScheme] = useUserColorScheme();
	const theme = useTheme();
	const [visible, setVisible] = useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const onBookmarksItemPress = () => {
		navigation.navigate("Bookmarks");
	};

	const onAboutItemPress = () => {
		navigation.navigate("About");
	};

	const onThemeSelectPress = (itemValue: string) => {
		hideModal();
		setUserColorScheme(itemValue);
	};

	return (
		<>
			<View style={styles.logoContainer}>
				<FastImage
					source={require("./../../assets/logo.png")}
					style={styles.logo}
					resizeMode={FastImage.resizeMode.cover}
				/>
				<Text variant="headlineSmall">UDev</Text>
			</View>
			<Divider />
			<View style={styles.itemsContainer}>
				<View>
					<Drawer.Item
						icon="bookmark"
						label="Bookmarks"
						onPress={onBookmarksItemPress}
					/>
					<Drawer.Item
						icon="information"
						label="About"
						onPress={onAboutItemPress}
					/>
				</View>
				<View>
					<Divider />
					<View style={styles.themeOptionContainer}>
						<Drawer.Item
							icon={"palette"}
							label={`Theme: ${userColorScheme?.toUpperCase()}`}
							onPress={showModal}
						/>
					</View>
				</View>
			</View>
			<Portal>
				<Modal
					dismissableBackButton
					visible={visible}
					onDismiss={hideModal}
					contentContainerStyle={[
						styles.modal,
						{ backgroundColor: theme.colors.surface },
					]}
				>
					<View style={styles.modalWrapper}>
						<Text variant="labelLarge">Choose Theme</Text>
						<View style={styles.modalButtonGroup}>
							<Button
								contentStyle={styles.buttonContent}
								icon={"palette"}
								uppercase
								mode="text"
								onPress={() => onThemeSelectPress(THEME_VALUES.System)}
							>
								{THEME_VALUES.System}
							</Button>
							<Button
								contentStyle={styles.buttonContent}
								icon={"white-balance-sunny"}
								uppercase
								mode="text"
								onPress={() => onThemeSelectPress(THEME_VALUES.Light)}
							>
								{THEME_VALUES.Light}
							</Button>
							<Button
								contentStyle={styles.buttonContent}
								icon={"moon-waning-crescent"}
								uppercase
								mode="text"
								onPress={() => onThemeSelectPress(THEME_VALUES.Dark)}
							>
								{THEME_VALUES.Dark}
							</Button>
						</View>
					</View>
				</Modal>
			</Portal>
		</>
	);
};

const styles = StyleSheet.create({
	itemsContainer: {
		marginTop: 16,
		justifyContent: "space-between",
		flex: 1,
	},
	logoContainer: {
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
		paddingVertical: 16,
	},
	logo: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	themeOptionContainer: {
		paddingVertical: 8,
	},
	modal: {
		padding: 20,
		marginHorizontal: "10%",
	},
	modalWrapper: {
		gap: 24,
	},
	modalButtonGroup: {
		gap: 8,
	},
	buttonContent: {
		justifyContent: "flex-start",
		gap: 8,
	},
});

export default memo(CustomDrawer);
