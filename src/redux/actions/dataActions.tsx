import {
	SET_POSTS,
	LOADING_DATA,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	LOADING_UI,
	POST_POST,
	CLEAR_ERRORS,
	SET_ERRORS,
	SET_POST,
	STOP_LOADING_UI,
	SUBMIT_COMMENT,
	EDIT_POST,
	DELETE_COMMENT,
	EDIT_COMMENT,
	SAVE_POST,
	UNSAVE_POST,
	SET_SAVED_POSTS,
	SET_REPLIES,
	POST_REPLY,
	DELETE_REPLY,
	EDIT_REPLY,
} from "../types";

import {
	axiosDelete,
	axiosGet,
	axiosPost,
	axiosPut,
} from "../../utils/AxiosReduxServices";
import { Dispatch } from "redux";
import axios from "axios";

export const getSavedPosts = () => (dispatch: Dispatch) => {
	dispatch({ type: LOADING_DATA });
	axiosGet("/saved", SET_SAVED_POSTS, SET_SAVED_POSTS, [], dispatch);
};

export const getPosts = () => (dispatch: Dispatch) => {
	dispatch({ type: LOADING_DATA });
	axiosGet("/posts", SET_POSTS, SET_POSTS, [], dispatch);
};

export const PostReply =
	(commentId: string, replyData: { body: string }) =>
	(dispatch: Dispatch<any>) => {
		axiosPost(
			`/comments/${commentId}/replies`,
			replyData,
			POST_REPLY,
			SET_ERRORS,
			dispatch
		);
	};

export const getReplies = (commentId: string) => (dispatch: Dispatch) => {
	dispatch({ type: LOADING_DATA });
	axiosGet(`/comments/${commentId}`, SET_REPLIES, SET_REPLIES, [], dispatch);
};

export const deleteReply =
	(commentId: string, replyId: string) => (dispatch: Dispatch) => {
		axiosDelete(
			`/comments/${commentId}/reply/${replyId}`,
			DELETE_REPLY,
			{ commentId, replyId },
			dispatch
		);
	};

export const editReply =
	(replyId: string, body: { body: string }) => (dispatch: Dispatch) => {
		axiosPut(`/reply/${replyId}`, body, EDIT_REPLY, SET_ERRORS, dispatch);
	};

export const createPost =
	(newPost: { body: string }) => (dispatch: Dispatch<any>) => {
		dispatch({ type: LOADING_UI });
		axiosPost(`/posts`, newPost, POST_POST, SET_ERRORS, dispatch);
		dispatch(cleanErrors());
	};

export const submitComment =
	(postId: string, commentData: { body: string }) =>
	(dispatch: Dispatch<any>) => {
		axiosPost(
			`/post/${postId}/comment`,
			commentData,
			SUBMIT_COMMENT,
			SET_ERRORS,
			dispatch
		);
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

export const editComment =
	(commentId: string, body: { body: string }) => (dispatch: Dispatch) => {
		axiosPut(
			`/comment/${commentId}`,
			body,
			EDIT_COMMENT,
			SET_ERRORS,
			dispatch
		);
	};
export const deletePost = (postId: string) => (dispatch: Dispatch) => {
	axiosDelete(`/post/${postId}`, DELETE_POST, postId, dispatch);
};

export const deleteComment =
	(postId: string, commentId: string) => (dispatch: Dispatch) => {
		axiosDelete(
			`/post/${postId}/comment/${commentId}`,
			DELETE_COMMENT,
			commentId,
			dispatch
		);
	};

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
			console.log(res.data);
		})
		.catch(() => {
			dispatch({
				type: SET_POSTS,
				payload: [],
			});
		});
};
