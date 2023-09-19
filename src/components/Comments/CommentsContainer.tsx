import { FunctionComponent } from "react";
import { FlatList } from "react-native";
import { ApiCommentItem } from "../../api/types";
import Comment from "./Comment";

type Props = {
	comments: ApiCommentItem[];
};

const CommentsContainer: FunctionComponent<Props> = ({ comments }) => {
	const renderItem = ({ item }: { item: ApiCommentItem }) => {
		return <Comment comment={item} />;
	};

	return <FlatList data={comments} renderItem={renderItem} />;
};

export default CommentsContainer;
