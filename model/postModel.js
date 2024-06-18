import postSchema from "@/schema/post/postSchema";

module.exports = {
	getPosts: () => {
		return postSchema.aggregate([
			[
				{
					$lookup: {
						from: "technologies",
						localField: "language_id",
						foreignField: "_id",
						as: "language",
						pipeline: [
							{
								$project: {
									language: 1,
									frameworks: 1,
									_id: 0,
								},
							},
						],
					},
				},
			],
		]);
	},
	addPosts: (data) => {
		return postSchema.create(data);
	},
};
