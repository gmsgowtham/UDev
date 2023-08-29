import App from "./App";
import { name as appName } from "./app.json";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";

AppRegistry.registerComponent(appName, () => App);
