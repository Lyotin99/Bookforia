import { Actions } from "../types";

import {
	axiosDelete,
	axiosPost,
	axiosPut,
} from "../../services/axiosReduxServices";
import { Dispatch } from "redux";
import { cleanErrors } from "./dataActions";

export const submitComment =
	(postId: string, commentData: { body: string }) =>
	(dispatch: Dispatch<any>) => {
		axiosPost(
			`/post/${postId}/comment`,
			commentData,
			Actions.SUBMIT_COMMENT,
			Actions.SET_ERRORS,
			dispatch
		);
		dispatch(cleanErrors());
	};

export const editComment =
	(commentId: string, body: { body: string }) => (dispatch: Dispatch) => {
		axiosPut(
			`/comment/${commentId}`,
			body,
			Actions.EDIT_COMMENT,
			Actions.SET_ERRORS,
			dispatch
		);
	};

export const deleteComment =
	(postId: string, commentId: string) => (dispatch: Dispatch) => {
		axiosDelete(
			`/post/${postId}/comment/${commentId}`,
			Actions.DELETE_COMMENT,
			commentId,
			dispatch
		);
	};
