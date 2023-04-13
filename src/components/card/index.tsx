import React, { FunctionComponent } from "react";
import FastImage from "react-native-fast-image";
import {
	StyledView,
	StyledFastImage,
	StyledText,
	StyledTouchableOpacity,
} from "../../zephyr/styled";

export interface author {
	imageUri: string;
	name: string;
}

export interface CardProps {
	id: number;
	title: string;
	description: string;
	author: author;
	dateReadable: string;
	onItemClick: (id: number, title: string) => void;
	organizationName?: string;
	coverImageUri?: string | null;
}

const Card: FunctionComponent<CardProps> = ({
	id,
	title,
	description,
	coverImageUri,
	author,
	dateReadable,
	onItemClick,
}) => {
	const onClick = () => {
		onItemClick(id, title);
	};

	return (
		<StyledTouchableOpacity
			classes={["px:1", "py:3", "gap:2"]}
			onPress={onClick}
		>
			{coverImageUri && (
				<StyledFastImage
					source={{ uri: coverImageUri }}
					classes={["h:56", "w:full", "rounded:md"]}
					resizeMode={FastImage.resizeMode.cover}
				/>
			)}
			<StyledText
				classes={["text:2xl", "font-weight:extrabold", "color:gray-900"]}
				darkClasses={["color:white"]}
			>
				{title}
			</StyledText>
			<StyledText
				classes={["text:base", "font-weight:light", "color:gray-700"]}
				darkClasses={["color:gray-100"]}
			>
				{description}
			</StyledText>
			<StyledView classes={["flex:row", "items:center", "gap:2", "mt:1"]}>
				<StyledFastImage
					classes={["w:12", "h:12", "rounded:full"]}
					source={{ uri: author.imageUri }}
					resizeMode={FastImage.resizeMode.cover}
				/>
				<StyledView classes={["items:start", "justify:start"]}>
					<StyledText
						classes={["text:lg", "color:gray-900", "font-weight:bold"]}
						darkClasses={["color:white"]}
					>
						{author.name}
					</StyledText>
					<StyledText
						classes={["text:base", "color:gray-900", "font-weight:light"]}
						darkClasses={["color:white"]}
					>
						{dateReadable}
					</StyledText>
				</StyledView>
			</StyledView>
		</StyledTouchableOpacity>
	);
};

export default Card;
