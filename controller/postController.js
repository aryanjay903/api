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
		const { title, description, language_id } = JSON.parse(req.body.data);
		if (!title || !description || !language_id || !req.file) {
			const missingFields = [];
			if (!title) missingFields.push("title");
			if (!description) missingFields.push("description");
			if (!language_id) missingFields.push("language_id");
			if (!req.file) missingFields.push("image");
			return res.status(400).json({
				status: false,
				message: `${missingFields.join(", ")} is required`,
			});
		}
		const data = {
			title: title,
			description: description,
			language_id: language_id,
			image: req.file,
		};
		// console.log(req.file);
		// const post = await postModel.addPosts(data);
		return res.status(200).json({
			status: true,
			// data: post,
			data: data,
		});
	},
};
