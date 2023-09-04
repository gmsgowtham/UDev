import {
	MD3DarkTheme,
	MD3LightTheme,
	MD3Theme,
	configureFonts,
} from "react-native-paper";
import Colors from "./colors/iris";

import fontsConfig from "./fonts";

export const LightTheme: MD3Theme = {
	...MD3LightTheme,
	colors: Colors.light,
	fonts: configureFonts({ config: fontsConfig, isV3: true }),
};

export const DarkTheme: MD3Theme = {
	...MD3DarkTheme,
	colors: Colors.dark,
	fonts: configureFonts({ config: fontsConfig, isV3: true }),
};
