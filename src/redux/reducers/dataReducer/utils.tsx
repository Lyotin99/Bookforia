import { InitialStateData } from "../../../utils/Interfaces";
import {
	DeletePostOrComment,
	DeleteReply,
	EditComment,
	EditReply,
	Posts,
	Replies,
	SavePost,
} from "./dataTypes";

import { ReplyData } from "../../../utils/Interfaces";

export const initialState: InitialStateData = {
	posts: [],
	post: {
		body: "",
		commentCount: 0,
		comments: [
			{
				body: "",
				createdAt: {
					_nanoseconds: 0,
					_seconds: 0,
				},
				postId: "",
				userImage: "",
				username: "",
				commentId: "",
				repliesCount: 0,
				replies: [
					{
						body: "",
						createdAt: {
							_nanoseconds: 0,
							_seconds: 0,
						},
						replyId: "",
						userImage: "",
						username: "",
						commentId: "",
					},
				],
			},
		],
		imageUrl: "",
		createdAt: { _nanoseconds: 0, _seconds: 0 },
		likeCount: 0,
		postId: "",
		userImage: "",
		username: "",
	},
	loading: false,
};

export const setReplies = (state: InitialStateData, action: Replies) => {
	if (action.payload[0]) {
		const replies = state.post.comments.map((el) => {
			if (el.commentId === action.payload[0].commentId) {
				el.replies = [...action.payload];
			}

			return el;
		});

		return {
			...state,
			post: {
				...state.post,
				comments: replies,
			},
		};
	} else return state;
};

export const deleteReply = (state: InitialStateData, action: DeleteReply) => {
	const commentsWithDeletedReply = state.post.comments.map((comment) => {
		comment.commentId === action.payload.commentId &&
			comment.repliesCount--;

		const replies = comment.replies.filter(
			(el) => el.replyId !== action.payload.replyId && el
		);

		comment.replies = [...replies];

		return comment;
	});

	return {
		...state,
		post: {
			...state.post,
			comments: commentsWithDeletedReply,
		},
	};
};

export const editReply = (state: InitialStateData, action: EditReply) => {
	const commentsWitEditedReply = state.post.comments.map((comment) => {
		const editedReply = comment.replies.find(
			(reply) => reply.replyId === action.payload.replyId
		);

		if (editedReply) editedReply.body = action.payload.body;

		return comment;
	});

	return {
		...state,
		post: {
			...state.post,
			comments: commentsWitEditedReply,
		},
	};
};

export const unsavePost = (state: InitialStateData, action: SavePost) => {
	let index = state.posts.findIndex(
		(post) => post.postId === action.payload.savedPostId
	);

	if (window.location.pathname === "/users/saved/") {
		const remainingPosts = [
			...state.posts.slice(0, index),
			...state.posts.slice(index + 1),
		];

		return {
			...state,
			posts: remainingPosts,
		};
	} else return state;
};

export const likeUnlikePost = (state: InitialStateData, action: Posts) => {
	const posts = state.posts.map((post) => {
		if (post.postId === action.payload.postId) {
			post.likeCount = action.payload.likeCount;
		}

		return post;
	});

	return {
		...state,
		posts: posts,
		post: {
			...state.post,
			likeCount: action.payload.likeCount,
		},
	};
};

export const editPost = (
	state: InitialStateData,
	action: { payload: string }
) => {
	const posts = state.posts.map((post) => {
		if (post.postId === state.post.postId) {
			post.body = action.payload;
		}

		return post;
	});

	return {
		...state,
		posts: posts,
		post: {
			...state.post,
			body: action.payload,
		},
	};
};

export const editComment = (state: InitialStateData, action: EditComment) => {
	const commentsWithEditedComment = state.post.comments.map((comment) => {
		if (comment.commentId === action.payload.commentId) {
			comment.body = action.payload.body;
		}

		return comment;
	});

	return {
		...state,
		post: {
			...state.post,
			comments: commentsWithEditedComment,
		},
	};
};

export const postReply = (
	state: InitialStateData,
	action: { payload: ReplyData }
) => {
	const commentsWithAddedReply = state.post.comments.map((comment) => {
		if (comment.commentId === action.payload.commentId) {
			comment.repliesCount++;
			comment.replies = [...comment.replies, action.payload];
		}

		return comment;
	});

	return {
		...state,
		post: {
			...state.post,
			comments: commentsWithAddedReply,
		},
	};
};

export const deletePost = (
	state: InitialStateData,
	action: DeletePostOrComment
) => {
	const index = state.posts.findIndex(
		(post) => post.postId === action.payload
	);

	const posts = [
		...state.posts.slice(0, index),
		...state.posts.slice(index + 1),
	];

	return {
		...state,
		posts,
	};
};

export const deleteComment = (
	state: InitialStateData,
	action: DeletePostOrComment
) => {
	const index = state.post.comments.findIndex(
		(comment) => comment.commentId === action.payload
	);

	const comments = [
		...state.post.comments.slice(0, index),
		...state.post.comments.slice(index + 1),
	];
	return {
		...state,
		post: {
			...state.post,
			commentCount: state.post.commentCount--,
			comments,
		},
	};
};
