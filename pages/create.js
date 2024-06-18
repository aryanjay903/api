import { useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardTitle,
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Form,
	FormGroup,
	Input,
	Label,
	NavItem,
	NavLink,
} from "reactstrap";
import Layout from "@/component/Layout";
import getConfig from "next/config";
import { useRouter } from "next/router";

const {
	publicRuntimeConfig: { apiUrl: api },
} = getConfig();
const sidebarStyle = {
	position: "fixed",
	top: 0,
	right: 0,
	width: "250px",
	height: "100%",
	backgroundColor: "#f8f9fa",
	boxShadow: "0 0 10px rgba(0,0,0,0.3)",
	transform: "translateX(100%)",
	transition: "transform 0.3s ease-in-out",
};

const sidebarOpenStyle = {
	transform: "translateX(0)",
};

const Sidebar = ({ isOpen, toggleSidebar }) => (
	<div style={{ ...sidebarStyle, ...(isOpen ? sidebarOpenStyle : {}) }}>
		<Button color="tertiary" onClick={toggleSidebar} style={{ margin: 20 }}>
			<h3>X</h3>
		</Button>
		<div style={{ padding: 20 }}>
			<p>Image</p>
			<p>Heading</p>
			<p>Sub Heading</p>
			<p>Peragraph</p>
			<p>CodeBox</p>
		</div>
	</div>
);
const Create = ({ technology }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [fields, setFields] = useState([]);
	const router = useRouter();
	const addField = (type) => () => {
		setFields([...fields, { type, id: fields.length }]);
	};

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};
	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			{/* {!isSidebarOpen && (
				<Button
					color="primary"
					className="rounded-circle py-0"
					onClick={toggleSidebar}
					style={{ zIndex: 1, position: "absolute", right: 50, bottom: -300 }}
				>
					<h1>+</h1>
				</Button>
			)} */}
			<Layout technology={technology}>
				<Form>
					<Card>
						<CardBody>
							<div className="d-flex justify-content-between mb-2">
								<CardTitle tag="h5">Create Post</CardTitle>
								<>
									<Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
										<DropdownToggle>+ Add Field</DropdownToggle>
										<DropdownMenu>
											<DropdownItem onClick={addField("image")}>
												Image
											</DropdownItem>
											<DropdownItem onClick={addField("heading")}>
												Heading
											</DropdownItem>
											<DropdownItem onClick={addField("subheading")}>
												Sub Heading
											</DropdownItem>
											<DropdownItem onClick={addField("paragraph")}>
												Peragraph
											</DropdownItem>
											<DropdownItem onClick={addField("codebox")}>
												Code-Box
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</>
							</div>
							<Card>
								<CardBody>
									<CardTitle tag="h5">
										This Firlds are required for post
									</CardTitle>
									<FormGroup>
										<Label for="main_image">Post Image*</Label>
										<Input type="file" id="main_image" name="main_image" />
									</FormGroup>
									<FormGroup>
										<Label for="title">Title*</Label>
										<Input
											type="text"
											id="title"
											name="title"
											placeholder="Enter Title"
										/>
									</FormGroup>
									<FormGroup>
										<Label for="description">Description*</Label>
										<Input
											type="textarea"
											name="description"
											id="description"
											placeholder="Enter Description"
										/>
									</FormGroup>
									<FormGroup>
										<Label for="language_id">Language*</Label>
										<Input type="select">
											<option value="javascript">javascript</option>
										</Input>
									</FormGroup>
								</CardBody>
							</Card>
							<CardBody>
								{Object.values(fields).map((field) => {
									const { type, id } = field;
									const inputType =
										type === "image"
											? "file"
											: type === "heading" || type === "subheading"
											? "text"
											: type === "paragraph" || type === "codebox"
											? "textarea"
											: null;
									const labelText =
										type === "image"
											? "Image"
											: type === "heading"
											? "Heading"
											: type === "subheading"
											? "Sub Heading"
											: type === "paragraph"
											? "Peragraph"
											: type === "codebox"
											? "Code Box"
											: null;
									const inputId = `${type}${id}`;
									const inputName = `${type}`;
									const isMultiple =
										type === "image" ||
										type === "paragraph" ||
										type === "codebox";

									if (inputType) {
										return (
											<FormGroup key={id}>
												<Label for={inputId}>{labelText}</Label>
												<Input
													type={inputType}
													id={inputId}
													name={inputName}
													multiple={isMultiple}
												/>
											</FormGroup>
										);
									}
									return null;
								})}
								<Button color="primary" onClick={() => router.push("/")}>
									Submit
								</Button>
							</CardBody>
						</CardBody>
					</Card>
					{/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
				</Form>
			</Layout>
		</>
	);
};
export async function getServerSideProps() {
	const res = await fetch(`${api}/technologies`).then((res) => res.json());
	return { props: { technology: res.status ? res.data : {} } };
}

export default Create;
