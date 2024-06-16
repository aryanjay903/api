import { createRouter } from "next-connect";
import mongodb from "@/lib/mongodb";
import postController from "@/controller/postController";
import multer from "multer";

const apiRouter = createRouter();
const upload = multer();
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
	.use(upload.single("image"))
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
