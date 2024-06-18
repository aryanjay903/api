import { createRouter } from "next-connect";
import mongodb from "@/lib/mongodb";
import postController from "@/controller/postController";
// import multer from "multer";
import upload from "@/utils/imageUpload";

const apiRouter = createRouter();
// const upload = multer();
const middleware = {
	onError(error, req, res) {
		res.status(500).json({
			status: false,
			message: `onError internal server issue, ${error.message}`,
		});
	},
	onNoMatch(req, res) {
		res.status(405).json({
			status: false,
			message: `method '${req.method}' not allowed`,
		});
	},
};

apiRouter
	.use(
		upload.fields([
			{ name: "main_image", maxCount: 1 },
			{ name: "image", maxCount: 10 },
		])
	)
	// .use(upload.single("main_image"))
	// .use(upload.array("image", 10))
	.post((req, res) => {
		mongodb();
		return postController.addPosts(req, res);
	})
	.get((req, res) => {
		mongodb();
		return postController.getPosts(req, res);
	});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default apiRouter.handler(middleware);
