import { Actions } from "../types";

import {
	axiosDelete,
	axiosGet,
	axiosPost,
	axiosPut,
} from "../../services/axiosReduxServices";
import { Dispatch } from "redux";

export const PostReply =
	(commentId: string, replyData: { body: string }) =>
	(dispatch: Dispatch<any>) => {
		axiosPost(
			`/comments/${commentId}/replies`,
			replyData,
			Actions.POST_REPLY,
			Actions.SET_ERRORS,
			dispatch
		);
	};

export const getReplies = (commentId: string) => (dispatch: Dispatch) => {
	dispatch({ type: Actions.LOADING_DATA });
	axiosGet(
		`/comments/${commentId}`,
		Actions.SET_REPLIES,
		Actions.SET_REPLIES,
		[],
		dispatch
	);
};

export const deleteReply =
	(commentId: string, replyId: string) => (dispatch: Dispatch) => {
		axiosDelete(
			`/comments/${commentId}/reply/${replyId}`,
			Actions.DELETE_REPLY,
			{ commentId, replyId },
			dispatch
		);
	};

export const editReply =
	(replyId: string, body: { body: string }) => (dispatch: Dispatch) => {
		axiosPut(
			`/reply/${replyId}`,
			body,
			Actions.EDIT_REPLY,
			Actions.SET_ERRORS,
			dispatch
		);
	};
