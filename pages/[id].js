import Layout from "@/component/Layout";
import getConfig from "next/config";
import {
	Badge,
	Card,
	CardBody,
	CardText,
	CardTitle,
	CardSubtitle,
} from "reactstrap";
import { useRouter } from "next/router";
import Image from "next/image";
import { CopyBlock } from 'react-code-blocks';

const {
	publicRuntimeConfig: { apiUrl: api },
} = getConfig();


const Slug = ({ technology, post }) => {
	const router = useRouter();
	const { id } = router.query;
	const postView = post.filter((post) => post._id === id);
	return (
		<Layout technology={technology}>
			{Object.values(postView).map(
				({ title, description, main_image, _id, language }) => (
					<Card key={_id}>
						<CardBody>
							<div className="d-flex gap-2">
								<CardTitle tag={"h4"}>{title}</CardTitle>
								{Object.values(language).map(({ language }, idx) => (
									<Badge key={idx} pill color="success" className="pt-2">
										{language}
									</Badge>
								))}
							</div>
							<div
								style={{
									width: "100%",
									height: "300px",
									position: "relative",
									overflow: "hidden",
								}}
							>
								<Image
									src={`/${main_image}`}
									alt="Sample"
									fill
									className="w-100 object-fit-cover"
								/>
							</div>
							<CardText>{description}</CardText>
							<CardBody>
								<CardTitle>heading</CardTitle>
								<CardSubtitle>Sub Heading</CardSubtitle>
								<div
									style={{
										position: "relative",
										width: "100%",
										height: "300px",
										overflow: "hidden",
									}}
								>
									<Image
										src="/images/garden-5337535_1280.jpg"
										alt="Sample"
										fill
										className="w-100 object-fit-cover"
									/>
								</div>
								<CardText>Peragraph</CardText>
								<CardText>CodeBox</CardText>
								<CopyBlock
      text={`const js =null;`}
      language={`javascript`}
      showLineNumbers={true}
      wrapLines
    />
							</CardBody>
						</CardBody>
					</Card>
				)
			)}
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

export default Slug;
