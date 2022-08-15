import "./styles/load.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoute from "./components/Common/AuthRoute";
import Footer from "./components/Footer/Footer";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// Pages
import home from "./pages/Homepage/Homepage";
import login from "./pages/Login/Login";
import signup from "./pages/Signup/Signup";
import booksCollection from "./pages/BooksLibrary/BooksLibrary";
import Navbar from "./components/Header/Header";
import user from "./pages/User/User";
import savedPosts from "./pages/SavedPost/SavedPost";
import SinglePostPage from "./pages/SinglePost/SinglePost";

function App() {
	return (
		<Provider store={store}>
			<div className="wrapper">
				<div className="wrapper__inner">
					<BrowserRouter>
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
					</BrowserRouter>
				</div>
			</div>
		</Provider>
	);
}

export default App;
