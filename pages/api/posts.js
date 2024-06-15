import { createRouter } from "next-connect";
import mongodb from "@/lib/mongodb";
import postController from "@/controller/postController";

const apiRouter = createRouter();
const middleware = {
	onError(error, req, res) {
		res.status(500).json({
			status: false,
			message: `internal server issue, ${error.message}`,
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
	.get((req, res) => {
		mongodb();
		return postController.getPosts(req, res);
	})
	.post((req, res) => {
		mongodb();
		return postController.addPosts(req, res);
	});

export const config = {
	bodyParser: false,
};

export default apiRouter.handler(middleware);
