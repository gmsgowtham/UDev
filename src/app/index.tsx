import { Redirect } from "expo-router";
import type { FunctionComponent } from "react";

const IndexRoute: FunctionComponent = () => {
	return <Redirect href="/(tabs)/home" />;
};

export default IndexRoute;
