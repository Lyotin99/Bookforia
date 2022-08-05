import { Link } from "react-router-dom";
import Notifications from "../Notifications/Notifications";

//Redux
import { connect } from "react-redux";
interface Props {
	authenticated: boolean;
}
interface StateData {
	user: {
		authenticated: boolean;
	};
}
function Header(props: Props) {
	const { authenticated } = props;

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

const mapStateToProps = (state: StateData) => ({
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Header);
