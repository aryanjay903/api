import technologySchema from "@/schema/technology/technologySchema";

module.exports = {
	getTechnologies: () => {
		return technologySchema.find();
	},
	addTechnologies: (data) => {
		return technologySchema.create(data);
	},
};
