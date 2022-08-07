import { Link } from "react-router-dom";
import Notifications from "../Notifications/Notifications";

//Redux
import { useSelector } from "react-redux";
interface StateData {
	user: {
		authenticated: boolean;
	};
}

function Header() {
	const mapStateToProps = (state: StateData) => ({
		authenticated: state.user.authenticated,
	});
	const data = useSelector(mapStateToProps);

	const { authenticated } = data;

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
