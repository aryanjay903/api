import postSchema from "@/schema/post/postSchema";

module.exports = {
	getPosts: () => {
		return postSchema.find();
	},
	addPosts: (data) => {
		return postSchema.create(data);
	},
};
