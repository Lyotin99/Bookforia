import { Actions } from "../../types";
import { UserActions } from "./dataTypes";

import {
	deleteComment,
	deletePost,
	deleteReply,
	editComment,
	editPost,
	editReply,
	initialState,
	likeUnlikePost,
	postReply,
	setReplies,
	unsavePost,
} from "./utils";

const postData = (state = initialState, action: UserActions) => {
	switch (action.type) {
		case Actions.LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case Actions.SET_SAVED_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			};
		case Actions.SET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			};
		case Actions.SET_POST:
			return {
				...state,
				post: action.payload,
			};
		case Actions.SAVE_POST:
			return {
				...state,
			};
		case Actions.SET_REPLIES:
			return setReplies(state, action);
		case Actions.DELETE_REPLY:
			return deleteReply(state, action);
		case Actions.EDIT_REPLY:
			return editReply(state, action);
		case Actions.UNSAVE_POST:
			return unsavePost(state, action);
		case Actions.LIKE_POST:
		case Actions.UNLIKE_POST:
			return likeUnlikePost(state, action);
		case Actions.EDIT_POST:
			return editPost(state, action);
		case Actions.EDIT_COMMENT:
			return editComment(state, action);
		case Actions.POST_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
			};
		case Actions.POST_REPLY:
			return postReply(state, action);
		case Actions.SUBMIT_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: [action.payload, ...state.post.comments],
				},
			};

		case Actions.DELETE_POST:
			return deletePost(state, action);

		case Actions.DELETE_COMMENT:
			return deleteComment(state, action);
		default:
			return state;
	}
};

export default postData;
