import { UserData } from "../../../utils/Interfaces";
import { Actions } from "../../types";

export type ActionType =
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
