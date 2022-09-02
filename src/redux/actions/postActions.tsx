import { Actions } from "../types";

import {
	axiosDelete,
	axiosGet,
	axiosPost,
	axiosPut,
} from "../../services/axiosReduxServices";
import { Dispatch } from "redux";
import { cleanErrors } from "./dataActions";

export const getSavedPosts = () => (dispatch: Dispatch) => {
	dispatch({ type: Actions.LOADING_DATA });
	axiosGet(
		"/saved",
		Actions.SET_SAVED_POSTS,
		Actions.SET_SAVED_POSTS,
		dispatch
	);
};

export const getPosts = () => (dispatch: Dispatch) => {
	dispatch({ type: Actions.LOADING_DATA });
	axiosGet("/posts", Actions.SET_POSTS, Actions.SET_POSTS, dispatch);
};

export const createPost =
	(newPost: { body: string }) => (dispatch: Dispatch<any>) => {
		dispatch({ type: Actions.LOADING_UI });
		axiosPost(
			`/posts`,
			newPost,
			Actions.POST_POST,
			Actions.SET_ERRORS,
			dispatch
		);
		dispatch(cleanErrors());
	};

export const savePost = (postId: string) => (dispatch: Dispatch) => {
	axiosGet(
		`/saved/${postId}`,
		Actions.SAVE_POST,
		Actions.SAVE_POST,
		dispatch
	);
};

export const unSavePost = (postId: string) => (dispatch: Dispatch) => {
	axiosGet(
		`/unsaved/${postId}`,
		Actions.UNSAVE_POST,
		Actions.UNSAVE_POST,
		dispatch
	);
};

export const likePost = (postId: string) => (dispatch: Dispatch) => {
	axiosGet(
		`/post/${postId}/like`,
		Actions.LIKE_POST,
		Actions.LIKE_POST,
		dispatch
	);
};

export const unlikePost = (postId: string) => (dispatch: Dispatch) => {
	axiosGet(
		`/post/${postId}/unlike`,
		Actions.UNLIKE_POST,
		Actions.UNLIKE_POST,
		dispatch
	);
};

export const getPost = (postId: string) => async (dispatch: Dispatch) => {
	dispatch({ type: Actions.LOADING_UI });
	let postData = await axiosGet(
		`/post/${postId}`,
		Actions.SET_POST,
		Actions.SET_POST,
		dispatch
	);

	if (postData) {
		dispatch({ type: Actions.STOP_LOADING_UI });
		return postData;
	}
};

export const editPost =
	(postId: string, body: string) => (dispatch: Dispatch) => {
		axiosPut(
			`/post/${postId}`,
			{ body },
			Actions.EDIT_POST,
			Actions.SET_ERRORS,
			dispatch
		);
	};

export const deletePost = (postId: string) => (dispatch: Dispatch) => {
	axiosDelete(`/post/${postId}`, Actions.DELETE_POST, postId, dispatch);
};
