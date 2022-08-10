import {
	LOADING_DATA,
	SET_ERRORS,
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
} from "../../services/AxiosReduxServices";
import { Dispatch } from "redux";

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
