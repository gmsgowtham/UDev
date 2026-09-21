import { type FunctionComponent, memo } from "react";
import { View } from "react-native";
import { useMarkdown } from "react-native-marked";
import { useMarkdownOptions } from "./useMarkdownOptions";

interface MarkdownChunkProps {
	value: string;
}

const MarkdownChunk: FunctionComponent<MarkdownChunkProps> = ({ value }) => {
	const options = useMarkdownOptions();
	const elements = useMarkdown(value, options);

	return <View>{elements}</View>;
};

export default memo(MarkdownChunk);
