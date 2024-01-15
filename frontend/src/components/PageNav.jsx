import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function PageNav() {
	return (
		<nav>
			<Logo />
			<ul>
				<li>
					<NavLink to="/teacher">Teacher</NavLink>
				</li>
				<li>
					<NavLink to="/admin">Admin</NavLink>
				</li>
				<li>
					<NavLink to="/aboutus">About Us</NavLink>
				</li>
				<li>Name</li>
			</ul>
		</nav>
	);
}

export default PageNav;
