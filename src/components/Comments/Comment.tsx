import { Fragment, FunctionComponent, memo } from "react";
import { View, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import { ApiCommentItem } from "../../api/types";
import CommentsContainer from "./CommentsContainer";

type Props = {
	comment: ApiCommentItem;
};

const Comment: FunctionComponent<Props> = ({ comment }) => {
	const { width } = useWindowDimensions();
	return (
		<View style={{ padding: 8 }}>
			<View style={{ borderWidth: 1 }}>
				<RenderHTML
					contentWidth={width}
					source={{ html: comment.body_html }}
					enableCSSInlineProcessing={false}
				/>
			</View>
			<CommentsContainer comments={comment.children} />
		</View>
	);
};

export default memo(Comment);
