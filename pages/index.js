import getConfig from "next/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	Container,
	NavLink,
	Navbar,
	Nav,
	Form,
	Button,
	NavbarToggler,
	Collapse,
	NavItem,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Input,
} from "reactstrap";

const {
	publicRuntimeConfig: { apiUrl: api },
} = getConfig();
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const DropdownComponent = ({ language, frameworks }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	return (
		<NavItem>
			<Dropdown
				onMouseEnter={() => setDropdownOpen(true)}
				onMouseLeave={() => setDropdownOpen(false)}
				isOpen={dropdownOpen}
				toggle={() => null}
			>
				<DropdownToggle
					tag={NavLink}
					className={`nav-link ${dropdownOpen && "active"}`}
				>
					{capitalize(language)}
				</DropdownToggle>
				<DropdownMenu>
					{frameworks?.map((framework, idx) => (
						<DropdownItem key={idx}>
							{capitalize(framework) + (language === "javascript" && "JS")}
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		</NavItem>
	);
};

const App = ({ technology }) => {
	const [data, setData] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const Technologies = data?.map(({ language, frameworks }, idx) => (
		<DropdownComponent key={idx} language={language} frameworks={frameworks} />
	));
	useEffect(() => {
		setData(technology);
	}, []);
	return (
		<div>
			<Navbar color="dark" dark expand="md">
				<Container>
					<Navbar color="dark" dark expand="md">
						<Link href="/" className="navbar-brand">
							Post
						</Link>
						<NavbarToggler onClick={toggle} />
						<Collapse
							isOpen={isOpen}
							navbar
							className="justify-content-between"
						>
							<Nav className="mr-auto" navbar>
								{Technologies}
							</Nav>
							<div className="d-flex gap-2">
								<Form inline>
									<Input type="text" placeholder="Search" />
								</Form>
								<Button color="info">Search</Button>
							</div>
						</Collapse>
					</Navbar>
				</Container>
			</Navbar>
		</div>
	);
};

export async function getServerSideProps() {
	const res = await fetch(`${api}/technologies`);
	const { data } = await res.json();
	return { props: { technology: data } };
}

export default App;
