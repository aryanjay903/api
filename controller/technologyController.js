import technologyModel from "../model/technologyModel";

module.exports = {
	getTechnologies: async (req, res) => {
		const technologies = await technologyModel.getTechnologies();
		return res.status(200).json({
			status: true,
			data: technologies,
		});
	},
	addTechnologies: async (req, res) => {
		const technologies = await technologyModel.addTechnologies(req.body);
		return res.status(200).json({
			status: true,
			data: technologies,
		});
	},
};
