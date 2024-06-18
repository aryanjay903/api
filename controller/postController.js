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
		if (!title || !description || !language_id || !req.files.main_image) {
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
		const main_image = req.files.main_image;
		const image = req.files.image;
		const imageString = main_image[0].path
			.replace(/^public\\/, "")
			.replace(/\\/g, "/");
		const data = {
			title: title,
			description: description,
			language_id: language_id,
			main_image: imageString,
			content: content,
		};
		// const post = await postModel.addPosts(data);
		return res.status(200).json({
			status: true,
			// data: post,
			data: data,
		});
	},
};
