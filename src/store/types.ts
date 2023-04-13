export interface ArticleListItem {
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
	tag_list: string[];
	tags: string;
	user: User;
	organization?: Organization;
	flare_tag?: FlareTag;
}

export interface FlareTag {
	name: string;
	bg_color_hex: String;
	text_color_hex: String;
}

export interface Organization {
	name: string;
	username: string;
	slug: string;
	profile_image: string;
	profile_image_90: string;
}

export enum ArticleTypes {
	Article = "article",
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

// TODO: unify
export interface ArticleItem {
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
	collection_id: null;
	published_timestamp: string;
	positive_reactions_count: number;
	cover_image: string;
	social_image: string;
	canonical_url: string;
	created_at: string;
	edited_at: null;
	crossposted_at: null;
	published_at: string;
	last_comment_at: string;
	reading_time_minutes: number;
	tag_list: string;
	tags: string[];
	body_html: string;
	body_markdown: string;
	user: User;
	organization: Organization;
}
