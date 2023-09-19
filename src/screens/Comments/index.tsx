import { FunctionComponent } from "react";
import { ApiCommentItem } from "../../api/types";
import { CommentsContainer } from "../../components/Comments";

const comments: ApiCommentItem[] = [
	{
		type_of: "comment",
		id_code: "29dem",
		created_at: "2023-09-18T20:31:47Z",
		body_html:
			"<p>I've never gotten involved with Hacktoberfest before, but keen to get involved this time around :)</p>\n\n",
		user: {
			name: "Barry Michael Doyle",
			username: "barrymichaeldoyle",
			twitter_username: "barrymdoyle",
			github_username: "barrymichaeldoyle",
			user_id: 41018,
			website_url: "https://barrymichaeldoyle.start.page",
			profile_image:
				"https://res.cloudinary.com/practicaldev/image/fetch/s--xezS2DKk--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/41018/162edfc7-780a-4d8b-87ba-ddd14206256c.jpg",
			profile_image_90:
				"https://res.cloudinary.com/practicaldev/image/fetch/s--u9kQsuic--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/41018/162edfc7-780a-4d8b-87ba-ddd14206256c.jpg",
		},
		children: [
			{
				type_of: "comment",
				id_code: "29dp7",
				created_at: "2023-09-19T11:37:40Z",
				body_html:
					"<p>Last year was my first and it's great to participate! If you need help I'm here!</p>\n\n",
				user: {
					name: "Renan Ferro",
					username: "renancferro",
					twitter_username: "renancferro",
					github_username: "ferrorenan",
					user_id: 617582,
					website_url: "https://dev-tab-daily.vercel.app/",
					profile_image:
						"https://res.cloudinary.com/practicaldev/image/fetch/s--UbkUaQkL--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/617582/bc204122-f4d9-4ca9-b458-cd897fca945b.png",
					profile_image_90:
						"https://res.cloudinary.com/practicaldev/image/fetch/s--MZso0KUf--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/617582/bc204122-f4d9-4ca9-b458-cd897fca945b.png",
				},
				children: [
					{
						type_of: "comment",
						id_code: "29dpn",
						created_at: "2023-09-19T12:16:40Z",
						body_html: "<p>Thanks man!</p>\n\n",
						user: {
							name: "Barry Michael Doyle",
							username: "barrymichaeldoyle",
							twitter_username: "barrymdoyle",
							github_username: "barrymichaeldoyle",
							user_id: 41018,
							website_url: "https://barrymichaeldoyle.start.page",
							profile_image:
								"https://res.cloudinary.com/practicaldev/image/fetch/s--xezS2DKk--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/41018/162edfc7-780a-4d8b-87ba-ddd14206256c.jpg",
							profile_image_90:
								"https://res.cloudinary.com/practicaldev/image/fetch/s--u9kQsuic--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/41018/162edfc7-780a-4d8b-87ba-ddd14206256c.jpg",
						},
						children: [],
					},
				],
			},
			{
				type_of: "comment",
				id_code: "29dg4",
				created_at: "2023-09-18T22:43:16Z",
				body_html: "<p>Same here :)</p>\n\n",
				user: {
					name: "Cherlock Code 🔎",
					username: "evergrowingdev",
					twitter_username: "evergrowingdev",
					github_username: null,
					user_id: 1027000,
					website_url: "https://evergrowingdev.substack.com/",
					profile_image:
						"https://res.cloudinary.com/practicaldev/image/fetch/s--DNl98s33--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1027000/3d79f207-f265-41e7-a460-5db1a113ce57.png",
					profile_image_90:
						"https://res.cloudinary.com/practicaldev/image/fetch/s--p1bhZ4cs--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1027000/3d79f207-f265-41e7-a460-5db1a113ce57.png",
				},
				children: [],
			},
			{
				type_of: "comment",
				id_code: "29dk6",
				created_at: "2023-09-19T03:49:24Z",
				body_html: "<p>+1</p>\n\n",
				user: {
					name: "Jyothikrishna ",
					username: "bhendi",
					twitter_username: "bhendiboi22",
					github_username: "bhendi-boi",
					user_id: 897790,
					website_url: "https://linktr.ee/jyothikrishna22",
					profile_image:
						"https://res.cloudinary.com/practicaldev/image/fetch/s--DqcMVYxU--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/897790/1e04b27c-f4c2-452e-b5c1-8e803cc6d875.png",
					profile_image_90:
						"https://res.cloudinary.com/practicaldev/image/fetch/s--f4eCCkd1--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/897790/1e04b27c-f4c2-452e-b5c1-8e803cc6d875.png",
				},
				children: [],
			},
		],
	},
	{
		type_of: "comment",
		id_code: "29dp6",
		created_at: "2023-09-19T11:36:12Z",
		body_html:
			"<p>Let's goooo, really looking forward to another year of Hacktoberfest 🤟🤟</p>\n\n",
		user: {
			name: "Renan Ferro",
			username: "renancferro",
			twitter_username: "renancferro",
			github_username: "ferrorenan",
			user_id: 617582,
			website_url: "https://dev-tab-daily.vercel.app/",
			profile_image:
				"https://res.cloudinary.com/practicaldev/image/fetch/s--UbkUaQkL--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/617582/bc204122-f4d9-4ca9-b458-cd897fca945b.png",
			profile_image_90:
				"https://res.cloudinary.com/practicaldev/image/fetch/s--MZso0KUf--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/617582/bc204122-f4d9-4ca9-b458-cd897fca945b.png",
		},
		children: [],
	},
];

const CommentsScreen: FunctionComponent = () => {
	return <CommentsContainer comments={comments} />;
};

export default CommentsScreen;
