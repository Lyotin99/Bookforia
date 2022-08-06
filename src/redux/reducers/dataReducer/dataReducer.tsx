import {
	SET_POSTS,
	LIKE_POST,
	UNLIKE_POST,
	LOADING_DATA,
	SET_POST,
	POST_POST,
	SUBMIT_COMMENT,
	DELETE_POST,
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
} from "../../types";

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

const postData = (state = initialState, action: any) => {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SET_SAVED_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			};
		case SET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			};
		case SET_POST:
			return {
				...state,
				post: action.payload,
			};
		case SAVE_POST:
			return {
				...state,
			};
		case SET_REPLIES:
			return setReplies(state, action);
		case DELETE_REPLY:
			return deleteReply(state, action);
		case EDIT_REPLY:
			return editReply(state, action);
		case UNSAVE_POST:
			return unsavePost(state, action);
		case LIKE_POST:
		case UNLIKE_POST:
			return likeUnlikePost(state, action);
		case EDIT_POST:
			return editPost(state, action);
		case EDIT_COMMENT:
			return editComment(state, action);
		case POST_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
			};
		case POST_REPLY:
			return postReply(state, action);
		case SUBMIT_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: [action.payload, ...state.post.comments],
				},
			};

		case DELETE_POST:
			return deletePost(state, action);

		case DELETE_COMMENT:
			return deleteComment(state, action);
		default:
			return state;
	}
};

export default postData;
