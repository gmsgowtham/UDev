import { memo } from "react";
import { StyledView } from "../../zephyr/styled";

const HR = () => (
	<StyledView
		classes={["border-b:hairline", "border-color:gray-400", "my:1"]}
	/>
);

export default memo(HR);
