import { SET_POSTS, LOADING_DATA, CLEAR_ERRORS } from "../types";

import { Dispatch } from "redux";
import axios from "axios";

export const cleanErrors = () => (dispatch: Dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};

export const getUserData = (username: string) => (dispatch: Dispatch) => {
	dispatch({ type: LOADING_DATA });

	axios
		.get(`/user/${username}`, {
			headers: {
				Authorization: localStorage.getItem("FBIdToken"),
			},
		})
		.then((res) => {
			dispatch({ type: SET_POSTS, payload: res.data.posts });
		})
		.catch(() => {
			dispatch({
				type: SET_POSTS,
				payload: [],
			});
		});
};
