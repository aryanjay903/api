import postModel from "@/model/postModel";

module.exports = {
	getPosts: async (req, res) => {
		const post = await postModel.getPosts();
		return res.status(200).json({
			status: true,
			data: post,
		});
	},
	addPosts: async (req, res) => {
		// const { image, title, description, language_id } = req.query;
		// const post = await postModel.addPosts(req.query);
		const { data } = JSON.stringify(req.query);
		console.log(JSON.stringify(data));
		return res.status(200).json({
			status: true,
			data: post,
		});
	},
};
