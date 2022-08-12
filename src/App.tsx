import "./styles/load.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Pages
import Footer from "./components/Footer/Footer";
import home from "./pages/Homepage/Homepage";
import login from "./pages/Login/Login";
import signup from "./pages/Signup/Signup";
import booksCollection from "./pages/BooksLibrary/BooksLibrary";
import Navbar from "./components/Header/Header";
import user from "./pages/User/User";
import AuthRoute from "./components/Common/AuthRoute";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import axios from "axios";
import savedPosts from "./pages/SavedPost/SavedPost";
import SinglePostPage from "./pages/SinglePost/SinglePost";
axios.defaults.baseURL =
	"https://europe-west1-social-media-backend-41ded.cloudfunctions.net/api";
interface JwtExp {
	exp?: number;
}

const token: string = localStorage.FBIdToken;

if (token) {
	const decodedToken: JwtExp = jwtDecode(token);
	let expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0;

	if (expirationTime <= Date.now()) {
		store.dispatch(logoutUser());
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		store.dispatch(getUserData());
	}
}
function App() {
	return (
		<Provider store={store}>
			<div className="wrapper">
				<div className="wrapper__inner">
					<Router>
						<Navbar />
						<main className="main">
							<Switch>
								<Route exact path="/" component={home} />
								<AuthRoute path="/login" component={login} />
								<AuthRoute path="/signup" component={signup} />
								<Route
									exact
									path="/users/saved"
									component={savedPosts}
								/>
								<Route
									exact
									path="/users/:username"
									component={user}
								/>
								<Route
									exact
									path="/users/:username/post/:postId"
									component={user}
								/>
								<Route
									path="/post/:postId"
									component={SinglePostPage}
								/>
								<Route
									path="/library"
									component={booksCollection}
								/>
							</Switch>
						</main>

						<Footer />
					</Router>
				</div>
			</div>
		</Provider>
	);
}

export default App;
