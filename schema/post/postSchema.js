import { Schema, models, model } from "mongoose";

const contentSchema = new Schema({
	image: [String],
	heading: [String],
	subheading: [String],
	paragraph: [String],
	codebox: [String],
});

const postSchema = new Schema(
	{
		main_image: String,
		title: String,
		description: String,
		language_id: { type: Schema.Types.ObjectId, ref: "technologies" },
		content: [contentSchema],
	},
	{
		timestamps: true,
	}
);

module.exports = models?.post || model("post", postSchema);
