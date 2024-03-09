declare module "react-native-remote-svg" {
	import React from "react";
	import type { ImageProps } from "react-native";

	type RNSVGImageProps = ImageProps;

	export default class SVGImage extends React.Component<RNSVGImageProps> {}
}
