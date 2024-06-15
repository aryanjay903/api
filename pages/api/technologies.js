import { createRouter } from "next-connect";
import mongodb from "@/lib/mongodb";
import technologyController from "@/controller/technologyController";

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
		return technologyController.getTechnologies(req, res);
	})
	.post((req, res) => {
		mongodb();
		return technologyController.addTechnologies(req, res);
	});

export const config = {
	bodyParser: true,
};

export default apiRouter.handler(middleware);
