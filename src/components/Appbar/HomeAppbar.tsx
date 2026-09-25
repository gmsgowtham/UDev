import { useNavigation, useRouter } from "expo-router";
import { Fragment, type FunctionComponent, memo } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Tooltip, useTheme } from "react-native-paper";
import { HEADER_HEIGHT } from "../../theme/spacing";

type props = {
	isVideoListScreen?: boolean;
};

const HomeAppbar: FunctionComponent<props> = ({
	isVideoListScreen = false,
}) => {
	const router = useRouter();
	const navigation = useNavigation();
	const theme = useTheme();

	const onMenuPress = () => {
		// Walk up to the drawer navigator (toggleDrawer bubbles from no
		// other level) instead of importing react-navigation directly,
		// which expo-router forbids as of SDK 56.
		let current: unknown = navigation;
		while (
			current &&
			typeof current === "object" &&
			"getParent" in current &&
			typeof current.getParent === "function"
		) {
			if (
				"toggleDrawer" in current &&
				typeof current.toggleDrawer === "function"
			) {
				current.toggleDrawer();
				return;
			}
			current = current.getParent();
		}
	};

	const onSearchItemPress = () => {
		router.push("/search");
	};

	return (
		<Fragment>
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
				<Tooltip title="Menu">
					<Appbar.Action
						animated={false}
						icon="menu"
						onPress={onMenuPress}
						testID="appbar-menu"
					/>
				</Tooltip>
				<Appbar.Content title="UDev" />
				{!isVideoListScreen ? (
					<Tooltip title="Search posts">
						<Appbar.Action
							animated={false}
							icon="search"
							onPress={onSearchItemPress}
						/>
					</Tooltip>
				) : null}
			</Appbar.Header>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	header: {
		height: HEADER_HEIGHT,
		borderBottomWidth: 1,
	},
});

export default memo(HomeAppbar);
