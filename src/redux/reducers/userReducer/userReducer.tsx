import {
	LOADING_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	SET_USER,
	LIKE_POST,
	UNLIKE_POST,
	MARK_NOTIFICATIONS_READ,
	SAVE_POST,
	UNSAVE_POST,
} from "../../types";

import { initialStateProps } from "./userReducerInterfaces";

const initialState: initialStateProps = {
	authenticated: false,
	loading: false,
	credentials: {},
	likes: [],
	savedPosts: [],
	notifications: [],
};

const userData = (state = initialState, action: any) => {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		case SET_USER:
			return {
				authenticated: true,
				loading: false,
				...action.payload,
			};
		case LOADING_USER:
			return {
				...state,
				loading: true,
			};
		case SAVE_POST:
			return {
				...state,
				savedPosts: [
					...state.savedPosts,
					{
						username: state.credentials?.username,
						postId: action.payload.postId,
					},
				],
			};
		case UNSAVE_POST:
			return {
				...state,

				savedPosts: state.savedPosts.filter(
					(savedPost) =>
						savedPost.postId !== action.payload.savedPostId
				),
			};
		case LIKE_POST:
			return {
				...state,
				likes: [
					...state.likes,
					{
						username: state.credentials?.username,
						postId: action.payload.postId,
					},
				],
			};
		case UNLIKE_POST:
			return {
				...state,
				likes: state.likes.filter(
					(like) => like.postId !== action.payload.postId
				),
			};
		case MARK_NOTIFICATIONS_READ:
			state.notifications?.forEach((not) => {
				not.read = true;
			});
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default userData;
