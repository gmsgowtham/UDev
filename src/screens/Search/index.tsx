import { StackParamList } from "../../router/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
	FunctionComponent,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { View } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";

type Props = NativeStackScreenProps<StackParamList, "Search">;

const SearchScreen: FunctionComponent<Props> = ({ navigation }) => {
	const searchRef = useRef() as RefObject<TextInput>;
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		searchRef.current?.focus();
	}, []);

	const onChangeSearch = (query: string) => {
		setSearchQuery(query);
	};

	const onBackIconPress = () => {
		navigation.goBack();
	};

	const onSubmit = () => {
		console.log("submit");
	};

	return (
		<View style={styles.container}>
			<Searchbar
				showDivider={false}
				onSubmitEditing={onSubmit}
				ref={searchRef}
				mode="view"
				icon="arrow-back"
				onIconPress={onBackIconPress}
				placeholder="Search posts"
				onChangeText={onChangeSearch}
				value={searchQuery}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default SearchScreen;
