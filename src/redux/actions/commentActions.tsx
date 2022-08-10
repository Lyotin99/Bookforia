import {
	SET_ERRORS,
	SUBMIT_COMMENT,
	DELETE_COMMENT,
	EDIT_COMMENT,
} from "../types";

import {
	axiosDelete,
	axiosPost,
	axiosPut,
} from "../../services/AxiosReduxServices";
import { Dispatch } from "redux";
import { cleanErrors } from "./dataActions";

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

export const deleteComment =
	(postId: string, commentId: string) => (dispatch: Dispatch) => {
		axiosDelete(
			`/post/${postId}/comment/${commentId}`,
			DELETE_COMMENT,
			commentId,
			dispatch
		);
	};
