import { Actions } from "../../types";
import { ActionType } from "./userTypes";
import { initialStateProps } from "./userReducerInterfaces";

const initialState: initialStateProps = {
	authenticated: false,
	loading: false,
	credentials: {},
	likes: [],
	savedPosts: [],
	notifications: [],
};

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
			const notifications = state.notifications?.map((not) => {
				not.read = true;

				return not;
			});
			return {
				...state,
				notifications,
				loading: false,
			};
		default:
			return state;
	}
};

export default userData;
