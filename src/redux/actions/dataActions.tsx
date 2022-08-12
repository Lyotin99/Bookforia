import { Actions } from "../types";

import { Dispatch } from "redux";
import axios from "axios";

export const cleanErrors = () => (dispatch: Dispatch) => {
	dispatch({ type: Actions.CLEAR_ERRORS });
};

export const getUserData = (username: string) => (dispatch: Dispatch) => {
	dispatch({ type: Actions.LOADING_DATA });

	axios
		.get(`/user/${username}`, {
			headers: {
				Authorization: localStorage.getItem("FBIdToken"),
			},
		})
		.then((res) => {
			dispatch({ type: Actions.SET_POSTS, payload: res.data.posts });
		})
		.catch(() => {
			dispatch({
				type: Actions.SET_POSTS,
				payload: [],
			});
		});
};
