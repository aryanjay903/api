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
		image: String,
		title: String,
		description: String,
		language_id: Schema.ObjectId,
		content: [contentSchema],
	},
	{
		timestamps: true,
	}
);

module.exports = models?.post || model("post", postSchema);
