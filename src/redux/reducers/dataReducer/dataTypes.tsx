import { CommentsData, DateObj, ReplyData } from "../../../utils/Interfaces";
import { Actions } from "../../types";

export type ActionType =
	| LoadingData
	| Posts
	| SavePost
	| Replies
	| PostReply
	| EditReply
	| DeleteReply
	| EditPost
	| EditComment
	| SubmitComment
	| DeletePostOrComment;

export interface LoadingData {
	type: Actions.LOADING_DATA;
}

export interface Posts {
	type:
		| Actions.SET_POST
		| Actions.SET_SAVED_POSTS
		| Actions.SET_POSTS
		| Actions.POST_POST
		| Actions.LIKE_POST
		| Actions.UNLIKE_POST;
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

export interface EditPost {
	type: Actions.EDIT_POST;
	payload: string;
}

export interface SavePost {
	type: Actions.SAVE_POST | Actions.UNSAVE_POST;
	payload: {
		postId: string;
		username: string;
		savedPostId: string;
	};
}

export interface Replies {
	type: Actions.SET_REPLIES;
	payload: ReplyData[];
}

export interface PostReply {
	type: Actions.POST_REPLY;
	payload: ReplyData;
}

export interface DeleteReply {
	type: Actions.DELETE_REPLY;
	payload: {
		commentId: string;
		replyId: string;
	};
}

export interface EditReply {
	type: Actions.EDIT_REPLY;
	payload: { body: string; replyId: string; commentId: string };
}

// export interface LikePost {
// 	type: Actions.LIKE_POST | Actions.UNLIKE_POST;
// }

export interface EditComment {
	type: Actions.EDIT_COMMENT;
	payload: {
		commentId: string;
		body: string;
	};
}

export interface SubmitComment {
	type: Actions.SUBMIT_COMMENT;
	payload: CommentsData;
}

export interface DeletePostOrComment {
	type: Actions.DELETE_COMMENT | Actions.DELETE_POST;
	payload: string;
}
