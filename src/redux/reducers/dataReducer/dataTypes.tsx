import { CommentsData, DateObj, ReplyData } from "../../../utils/Interfaces";
import { Actions } from "../../types";

export type UserActions =
	| LoadingData
	| Posts
	| SavePost
	| Replies
	| DeleteReply
	| LikePost
	| EditComment
	| SubmitComment
	| DeletePostOrComment;

interface LoadingData {
	type: Actions.LOADING_DATA;
}

interface Posts {
	type:
		| Actions.SET_POST
		| Actions.SET_SAVED_POSTS
		| Actions.SET_POSTS
		| Actions.POST_POST
		| Actions.EDIT_POST;
	payload: {
		postId: string;
		body: string;
		imageUrl: string;
		createdAt: DateObj;
		likeCount: number;
		commentCount: number;
		userImage: string;
		username: string;
		comments?: CommentsData[];
	};
}

interface SavePost {
	type: Actions.SAVE_POST | Actions.UNSAVE_POST;
	payload: {
		postId: string;
		username: string;
	};
}

interface Replies {
	type: Actions.SET_REPLIES | Actions.EDIT_REPLY | Actions.POST_REPLY;
	payload: ReplyData[];
}

interface DeleteReply {
	type: Actions.DELETE_REPLY;
	payload: {
		commentId: string;
		replyId: string;
	};
}

interface LikePost {
	type: Actions.LIKE_POST | Actions.UNLIKE_POST;
}

interface EditComment {
	type: Actions.EDIT_COMMENT;
	payload: {
		commentId: string;
		body: string;
	};
}

interface SubmitComment {
	type: Actions.SUBMIT_COMMENT;
	payload: CommentsData;
}

interface DeletePostOrComment {
	type: Actions.DELETE_COMMENT | Actions.DELETE_POST;
	payload: string;
}
