import { useMemo } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import {
	COLOR_SCHEME_VALUES,
	DEFAULT_COLOR_SCHEME,
	useUserColorSchemeMMKV,
} from "./../mmkv/colorScheme";

const useUserColorScheme = () => {
	const [userColorScheme] = useUserColorSchemeMMKV();
	const systemColorScheme = useColorScheme();

	const scheme = useMemo(() => {
		let scheme: ColorSchemeName;
		if (userColorScheme === COLOR_SCHEME_VALUES.System || !userColorScheme) {
			scheme = (systemColorScheme ?? DEFAULT_COLOR_SCHEME) as ColorSchemeName;
		} else {
			scheme = userColorScheme as ColorSchemeName;
		}

		return scheme;
	}, [userColorScheme, systemColorScheme]);

	return scheme;
};

export default useUserColorScheme;
