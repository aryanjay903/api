import { Schema, models, model } from "mongoose";

const technologySchema = new Schema(
	{
		language: String,
		frameworks: [String],
	},
	{ timestamps: true }
);

module.exports =
	models?.technologies || model("technologies", technologySchema);
