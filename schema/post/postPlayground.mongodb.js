use("api");

// db.getCollection("post").insertOne({
// 	title: "abc",
// 	description: "def",
// 	language: ObjectId("666a8b9a34b010617354164c"),
// 	content: [
// 		{
// 			heading: "abc",
// 			paragraphs: [
// 				{
// 					paragraph: "def",
// 				},
// 				{
// 					paragraph: "ghi",
// 				},
// 			],
// 		},
// 		{
// 			heading: "def",
// 			paragraphs: [
// 				{
// 					paragraph: "ghi",
// 				},
// 				{
// 					paragraph: "jkl",
// 				},
// 			],
// 		},
// 	],
// 	image: "def",
// });
db.getCollection("post").find({ _id: ObjectId("666bd744d95e3f7581e3d4b6") });
db.aggregate([
	{
		$lookup: {
			from: "header",
			localField: "language",
			foreignField: "_id",
			as: "header",
		},
	},
]);
