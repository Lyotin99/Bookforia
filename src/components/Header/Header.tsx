import { Link } from "react-router-dom";
import Notifications from "../Notifications/Notifications";
import useReduxSelector from "../../hooks/useReduxSelector";

function Header() {
	const data = useReduxSelector();
	const { authenticated } = data.user;

	return (
		<header className="header">
			<nav className="nav">
				{authenticated ? (
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>

						<li>
							<Link to="/users/saved/">Saved</Link>
						</li>

						<li>
							<Link to="/library">Archive</Link>
						</li>

						<li title="Notifications">
							<Notifications />
						</li>
					</ul>
				) : (
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>

						<li>
							<Link to="/login">Login</Link>
						</li>

						<li>
							<Link to="/signup"> Signup</Link>
						</li>

						<li>
							<Link to="/library">Archive</Link>
						</li>
					</ul>
				)}
			</nav>
		</header>
	);
}

export default Header;
