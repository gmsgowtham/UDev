interface ApiArticleCommon {
	type_of: string;
	id: number;
	title: string;
	description: string;
	readable_publish_date: string;
	slug: string;
	path: string;
	url: string;
	comments_count: number;
	public_reactions_count: number;
	collection_id: number | null;
	published_timestamp: string;
	positive_reactions_count: number;
	cover_image: string | null;
	social_image: string;
	canonical_url: string;
	created_at: string;
	edited_at: string | null;
	crossposted_at: string | null;
	published_at: string;
	last_comment_at: string;
	reading_time_minutes: number;
	user: User;
	organization?: Organization;
}

export interface Organization {
	name: string;
	username: string;
	slug: string;
	profile_image: string;
	profile_image_90: string;
}

export interface User {
	name: string;
	username: string;
	twitter_username: string | null;
	github_username: string | null;
	user_id: number;
	website_url: string | null;
	profile_image: string;
	profile_image_90: string;
}

export interface ApiArticleFeedItem extends ApiArticleCommon {
	tag_list: string[];
	tags: string;
	flare_tag?: FlareTag;
}

export interface FlareTag {
	name: string;
	bg_color_hex: string;
	text_color_hex: string;
}

export interface ApiArticleItem extends ApiArticleCommon {
	cover_image_width: number;
	cover_image_height: number;
	cover_image_aspect_ratio: number;
	tag_list: string;
	tags: string[];
	body_html: string;
	body_markdown: string;
	user: User;
}

export enum ArticleFeedApiStates {
	Fresh = "fresh",
	Rising = "rising",
}

export interface ApiVideoListItem {
	type_of: VideoTypes;
	id: number;
	path: string;
	cloudinary_video_url: string;
	title: string;
	user_id: number;
	video_duration_in_minutes: string;
	video_source_url: string;
	user: User;
}

export enum VideoTypes {}
