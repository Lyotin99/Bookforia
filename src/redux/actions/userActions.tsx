import { Actions } from "../types";
import { axiosGet, axiosPostNoFetch } from "../../services/axiosReduxServices";
import authService from "../../services/authService";
import axios from "axios";
import { Dispatch } from "redux";
import { AuthData, History, UserDetails } from "../../utils/Interfaces";

export const getUserData = () => (dispatch: Dispatch) => {
	dispatch({ type: Actions.LOADING_USER });
	axiosGet("/user", Actions.SET_USER, Actions.SET_USER, dispatch);
};

export const loginUser =
	(userData: AuthData, history: History) => (dispatch: Dispatch<any>) => {
		dispatch({ type: Actions.LOADING_UI });
		authService("/login", userData, history, dispatch);
	};

export const signupUser =
	(newUserData: AuthData, history: History) => (dispatch: Dispatch<any>) => {
		dispatch({ type: Actions.LOADING_UI });
		authService("/signup", newUserData, history, dispatch);
	};

export const logoutUser = () => (dispatch: Dispatch) => {
	localStorage.removeItem("FBIdToken");
	delete axios.defaults.headers.common["Authorization"];
	dispatch({ type: Actions.SET_UNAUTHENTICATED });
};

export const uploadImage =
	(formData: FormData) => (dispatch: Dispatch<any>) => {
		dispatch({ type: Actions.LOADING_USER });
		axiosPostNoFetch("/user/image", formData)
			.then(() => {
				dispatch(getUserData());
			})
			.catch((err) => {
				console.log(err);
			});
	};

export const editUserDetails =
	(userDetails: UserDetails) => (dispatch: Dispatch<any>) => {
		dispatch({ type: Actions.LOADING_USER });
		axiosPostNoFetch("/user", userDetails)
			.then(() => {
				dispatch(getUserData());
			})
			.catch((err) => {
				console.log(err);
			});
	};

export const markNotificationsRead =
	(notificationIds: string[]) => (dispatch: Dispatch) => {
		axiosPostNoFetch("/notifications", notificationIds)
			.then(() => {
				dispatch({
					type: Actions.MARK_NOTIFICATIONS_READ,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
