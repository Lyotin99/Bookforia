import { Route, Redirect } from "react-router-dom";
import useReduxSelector from "../../hooks/useReduxSelector";

const AuthRoute = ({ component: Component, ...rest }: any) => {
	const data = useReduxSelector();
	const { authenticated } = data.user;

	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated === true ? (
					<Redirect to="/" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default AuthRoute;
