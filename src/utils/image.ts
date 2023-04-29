import { Image } from "react-native";

interface ImageSize {
	width: number;
	height: number;
}

export const getImageSize = async (uri: string): Promise<ImageSize> => {
	return new Promise((resolve) => {
		Image.getSize(
			uri,
			(width: number, height: number) => {
				resolve({ width, height });
			},
			(e) => resolve({ width: 0, height: 0 }),
		);
	});
};
