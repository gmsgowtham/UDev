import { Image } from "react-native";

interface ImageSize {
	width: number;
	height: number;
}

export const getImageSize = async (uri?: string | null): Promise<ImageSize> => {
	return new Promise((resolve) => {
		if (uri) {
			Image.getSize(
				uri,
				(width: number, height: number) => {
					resolve({ width, height });
				},
				() => resolve({ width: 0, height: 0 }),
			);
		}

		resolve({ width: 0, height: 0 });
	});
};
