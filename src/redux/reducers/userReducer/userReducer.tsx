import { UserData } from "../../../utils/Interfaces";
import { Actions } from "../../types";

import { initialStateProps } from "./userReducerInterfaces";

const initialState: initialStateProps = {
	authenticated: false,
	loading: false,
	credentials: {},
	likes: [],
	savedPosts: [],
	notifications: [],
};

type ActionType =
	| isAuthenticated
	| SetUser
	| LoadingUser
	| SavePost
	| UnSavePost
	| LikneUnlikePost
	| MarkNotifications;

interface isAuthenticated {
	type: Actions.SET_AUTHENTICATED | Actions.SET_UNAUTHENTICATED;
}

interface SetUser {
	type: Actions.SET_USER;
	payload: UserData;
}

interface LoadingUser {
	type: Actions.LOADING_USER;
}

interface SavePost {
	type: Actions.SAVE_POST;
	payload: {
		postId: string;
		username: string;
	};
}

interface UnSavePost {
	type: Actions.UNSAVE_POST;
	payload: {
		savedPostId: string;
		postId: string;
	};
}

interface LikneUnlikePost {
	type: Actions.LIKE_POST | Actions.UNLIKE_POST;
	payload: {
		postId: string;
		username: string;
	};
}

interface MarkNotifications {
	type: Actions.MARK_NOTIFICATIONS_READ;
}

const userData = (state = initialState, action: ActionType) => {
	switch (action.type) {
		case Actions.SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case Actions.SET_UNAUTHENTICATED:
			return initialState;
		case Actions.SET_USER:
			return {
				...action.payload,
				authenticated: true,
				loading: false,
			};
		case Actions.LOADING_USER:
			return {
				...state,
				loading: true,
			};
		case Actions.SAVE_POST:
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
		case Actions.UNSAVE_POST:
			return {
				...state,

				savedPosts: state.savedPosts.filter(
					(savedPost) =>
						savedPost.postId !== action.payload.savedPostId
				),
			};
		case Actions.LIKE_POST:
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
		case Actions.UNLIKE_POST:
			return {
				...state,
				likes: state.likes.filter(
					(like) => like.postId !== action.payload.postId
				),
			};
		case Actions.MARK_NOTIFICATIONS_READ:
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
