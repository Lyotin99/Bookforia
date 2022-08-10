import {
	SET_POSTS,
	LOADING_DATA,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	LOADING_UI,
	POST_POST,
	SET_ERRORS,
	SET_POST,
	STOP_LOADING_UI,
	EDIT_POST,
	SAVE_POST,
	UNSAVE_POST,
	SET_SAVED_POSTS,
} from "../types";

import {
	axiosDelete,
	axiosGet,
	axiosPost,
	axiosPut,
} from "../../services/AxiosReduxServices";
import { Dispatch } from "redux";
import { cleanErrors } from "./dataActions";

export const getSavedPosts = () => (dispatch: Dispatch) => {
	dispatch({ type: LOADING_DATA });
	axiosGet("/saved", SET_SAVED_POSTS, SET_SAVED_POSTS, [], dispatch);
};

export const getPosts = () => (dispatch: Dispatch) => {
	dispatch({ type: LOADING_DATA });
	axiosGet("/posts", SET_POSTS, SET_POSTS, [], dispatch);
};

export const createPost =
	(newPost: { body: string }) => (dispatch: Dispatch<any>) => {
		dispatch({ type: LOADING_UI });
		axiosPost(`/posts`, newPost, POST_POST, SET_ERRORS, dispatch);
		dispatch(cleanErrors());
	};

export const savePost = (postId: string) => (dispatch: Dispatch) => {
	axiosGet(`/saved/${postId}`, SAVE_POST, SAVE_POST, [], dispatch);
};

export const unSavePost = (postId: string) => (dispatch: Dispatch) => {
	axiosGet(`/unsaved/${postId}`, UNSAVE_POST, UNSAVE_POST, [], dispatch);
};

export const likePost = (postId: string) => (dispatch: Dispatch) => {
	axiosGet(`/post/${postId}/like`, LIKE_POST, LIKE_POST, [], dispatch);
};

export const unlikePost = (postId: string) => (dispatch: Dispatch) => {
	axiosGet(`/post/${postId}/unlike`, UNLIKE_POST, UNLIKE_POST, [], dispatch);
};

export const getPost = (postId: string) => async (dispatch: Dispatch) => {
	dispatch({ type: LOADING_UI });
	let postData = await axiosGet(
		`/post/${postId}`,
		SET_POST,
		SET_POST,
		[],
		dispatch
	);

	if (postData) {
		dispatch({ type: STOP_LOADING_UI });
		return postData;
	}
};

export const editPost =
	(postId: string, body: string) => (dispatch: Dispatch) => {
		axiosPut(`/post/${postId}`, { body }, EDIT_POST, SET_ERRORS, dispatch);
	};

export const deletePost = (postId: string) => (dispatch: Dispatch) => {
	axiosDelete(`/post/${postId}`, DELETE_POST, postId, dispatch);
};
