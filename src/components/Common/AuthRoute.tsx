import { Route, Redirect } from "react-router-dom";
import useReduxSelector from "../../hooks/useReduxSelector";

const AuthRoute = ({
	component: Component,
	path,
}: {
	component: React.ElementType;
	path: string;
}) => {
	const data = useReduxSelector();
	const { authenticated } = data.user;

	return (
		<Route
			{...path}
			render={(props) =>
				authenticated ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	);
};

export default AuthRoute;
