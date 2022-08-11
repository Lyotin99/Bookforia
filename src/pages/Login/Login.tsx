import { Link } from "react-router-dom";
import BookSpinner from "../../photos/bookSpinner.svg";
import useReduxSelector from "../../hooks/useReduxSelector";
//MUI
import MenuBookIcon from "@material-ui/icons/MenuBook";
//Redux
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
//Interfaces
import { History } from "../../utils/postInterfaces";

const Login = (props: { history: History }) => {
	const data = useReduxSelector();
	const dispatch = useDispatch();
	const { loading, errors } = data.UI;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");
		const userData = {
			email: String(email),
			password: String(password),
		};

		dispatch(loginUser(userData, props.history));
	};

	return (
		<div className="section-form-login">
			<div className="shell">
				<div className="section__inner">
					<div className="section__head">
						<MenuBookIcon className="section__icon" />

						<h1>Login</h1>
					</div>

					<div className="section__body">
						<div className="form-login">
							<form noValidate onSubmit={handleSubmit}>
								<div className="form__login-body">
									<div className="form__login-row">
										<div className="form__login-label">
											<label htmlFor="email">Email</label>
										</div>

										<div className="form__login-controls">
											<input
												type="email"
												name="email"
												placeholder="nobody@example.com"
											/>

											<p className="form__login-error">
												{errors ? errors.email : ""}

												{errors &&
												errors.error ===
													"auth/invalid-email"
													? "Email is invalid"
													: ""}
											</p>
										</div>
									</div>

									<div className="form__login-row">
										<div className="form__login-label">
											<label htmlFor="password">
												Password
											</label>
										</div>

										<div className="form__login-controls">
											<input
												type="password"
												name="password"
												placeholder="Enter your password..."
											/>

											<p className="form__login-error">
												{errors ? errors.password : ""}

												{errors ? errors.general : ""}
											</p>
										</div>
									</div>
								</div>

								<div className="form__login-actions">
									<button
										className="btn"
										type="submit"
										disabled={loading}
									>
										Login
										{loading && (
											<img
												className="spinner spinner--small"
												src={BookSpinner}
												alt="Book Spinner"
											/>
										)}
									</button>
								</div>

								<div className="form__login-meta">
									Don't have an account ? Sign up{" "}
									<Link to="/signup">here</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
