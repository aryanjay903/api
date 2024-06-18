import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardText,
	CardTitle,
} from "reactstrap";
import getConfig from "next/config";
import Layout from "@/component/Layout";
import Image from "next/image";
import { Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const {
	publicRuntimeConfig: { apiUrl: api },
} = getConfig();

const App = ({ technology, post }) => {
	// const App = () => {
	const router = useRouter();
	// console.log("technology:", technology);
	// console.log("post:", post);
	// const [posts, setPosts] = useState();
	// const [technology, setTechnology] = useState();
	// useEffect(() => {
	// 	(async () => {
	// 		const technologyResponse = await axios.get(`${api}/technologies`);
	// 		const postResponse = await axios.get(`${api}/posts`);

	// 		const technology = technologyResponse.data;
	// 		const post = postResponse.data;
	// 		// console.log(post.data);
	// 		// console.log(technology.data);
	// 		setPosts(post.data);
	// 		setTechnology(technology.data);
	// 	})();
	// }, []);
	return (
		<Layout technology={technology}>
			<Row>
				{post?.map(({ title, description, main_image, _id, language }) => (
					<Col md={4} key={_id} className="mb-4">
						<Card className="overflow-hidden">
							<div
								style={{
									width: "100%",
									height: "200px",
									position: "relative",
									overflow: "hidden",
								}}
							>
								<Image
									className="object-fit-cover w-100"
									alt="Sample"
									src={`/${main_image}`}
									fill
								/>
							</div>
							<CardBody>
								<CardTitle tag="h5">{title}</CardTitle>
								<CardText>
									{description?.length > 100
										? description?.slice(0, 100) + "..."
										: description}
								</CardText>
								<Button
									color="dark"
									outline
									onClick={() => router.push(`/${_id}`)}
								>
									Learn More
								</Button>
							</CardBody>
							<CardFooter>
								{language?.map(({ language }, idx) => (
									<Badge pill color="success" key={idx}>
										{language}
									</Badge>
								))}
							</CardFooter>
						</Card>
					</Col>
				))}
			</Row>
		</Layout>
	);
};

export async function getServerSideProps() {
	const [technology, post] = await Promise.all([
		fetch(`${api}/technologies`).then((res) => res.json()),
		fetch(`${api}/posts`).then((res) => res.json()),
	]);

	return {
		props: { technology: technology.data || [], post: post.data || [] },
	};
}

// chatgpt
// export async function getServerSideProps() {
// 	let technology = [];
// 	let post = [];

// 	try {
// 		// Fetch data from both endpoints in parallel
// 		const [technologyRes, postRes] = await Promise.all([
// 			fetch(`${api}/technologies`),
// 			fetch(`${api}/posts`),
// 		]);

// 		// Check if both fetches are successful
// 		if (technologyRes.ok && postRes.ok) {
// 			const [technologyData, postData] = await Promise.all([
// 				technologyRes.json(),
// 				postRes.json(),
// 			]);

// 			// Extract data if it exists
// 			technology = technologyData.data || [];
// 			post = postData.data || [];
// 		} else {
// 			// Log any non-200 responses
// 			console.error("Failed to fetch data:", {
// 				technologyStatus: technologyRes.status,
// 				postStatus: postRes.status,
// 			});
// 		}
// 	} catch (error) {
// 		// Catch and log any errors that occur during fetch or parsing
// 		console.error("An error occurred while fetching data:", error);
// 	}

// 	// Return the props to the component
// 	return {
// 		props: { technology, post },
// 	};
// }

export default App;
