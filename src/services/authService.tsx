import axios from "axios";
import { getUserData } from "../redux/actions/userActions";
import { Actions } from "../redux/types";
import { AuthData, History } from "../utils/Interfaces";
import { Dispatch } from "redux";
const getAuth = (
	url: string,
	userData: AuthData,
	history: History,
	dispatch: Dispatch<any>
) => {
	axios
		.post(url, userData)
		.then((res) => {
			const FBIdToken = `Bearer ${res.data.token}`;
			localStorage.setItem("FBIdToken", FBIdToken);
			dispatch(getUserData());

			dispatch({ type: Actions.CLEAR_ERRORS });
			history.push("/");
		})
		.catch((error) => {
			dispatch({
				type: Actions.SET_ERRORS,
				payload: error.response.data,
			});
		});
};

export default getAuth;
