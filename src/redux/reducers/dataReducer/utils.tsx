import { InitialStateData } from "../../../utils/postInterfaces";

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

export const setReplies = (state: InitialStateData, action: any) => {
	let repliesCounter = 0;
	if (action.payload[0]) {
		for (let i = 0; i < state.post.comments.length; i++) {
			if (
				state.post.comments[i].commentId === action.payload[0].commentId
			) {
				break;
			}
			repliesCounter++;
		}

		state.post.comments[repliesCounter].replies = action.payload;
	}
	return {
		...state,
	};
};

export const deleteReply = (state: InitialStateData, action: any) => {
	let index = state.post.comments.findIndex(
		(comment) => comment.commentId === action.payload.commentId
	);

	let replyIndex = state.post.comments[index].replies.findIndex(
		(reply) => reply.replyId === action.payload.replyId
	);

	state.post.comments[index].repliesCount--;
	state.post.comments[index].replies.splice(replyIndex, 1);
	return {
		...state,
	};
};

export const editReply = (state: InitialStateData, action: any) => {
	const index = state.post.comments.findIndex(
		(com) => com.commentId === action.payload.commentId
	);
	let replyData = state.post.comments[index].replies.filter(
		(reply) => reply.replyId === action.payload.replyId
	);

	replyData[0].body = action.payload.body;

	return {
		...state,
	};
};

export const unsavePost = (state: InitialStateData, action: any) => {
	let index = state.posts.findIndex(
		(post) => post.postId === action.payload.savedPostId
	);
	if (window.location.pathname === "/users/saved/")
		state.posts.splice(index, 1);

	return {
		...state,
	};
};

export const likeUnlikePost = (state: InitialStateData, action: any) => {
	let index = state.posts.findIndex(
		(post) => post.postId === action.payload.postId
	);

	state.posts[index] = action.payload;
	state.post.likeCount = action.payload.likeCount;
	return {
		...state,
	};
};

export const editPost = (state: InitialStateData, action: any) => {
	let counter = 0;
	for (let i = 0; i < state.posts.length; i++) {
		if (state.post.postId === state.posts[i].postId) {
			break;
		} else counter++;
	}
	state.posts[counter].body = action.payload;
	state.post.body = action.payload;
	return {
		...state,
	};
};

export const editComment = (state: InitialStateData, action: any) => {
	const commentId = state.post.comments.filter(
		(com) => com.commentId === action.payload.commentId
	);
	commentId[0].body = action.payload.body;

	return {
		...state,
		post: {
			...state.post,
			comments: [...state.post.comments],
		},
	};
};

export const postReply = (state: InitialStateData, action: any) => {
	let counter = 0;
	for (let i = 0; i < state.post.comments.length; i++) {
		if (state.post.comments[i].commentId === action.payload.commentId) {
			break;
		}
		counter++;
	}

	state.post.comments[counter].replies.push(action.payload);
	state.post.comments[counter].repliesCount++;

	return {
		...state,
	};
};

export const deletePost = (state: InitialStateData, action: any) => {
	let index = state.posts.findIndex((post) => post.postId === action.payload);
	state.posts.splice(index, 1);
	return {
		...state,
	};
};

export const deleteComment = (state: InitialStateData, action: any) => {
	let index = state.post.comments.findIndex(
		(comment) => comment.commentId === action.payload
	);
	state.post.commentCount--;
	state.post.comments.splice(index, 1);
	return {
		...state,
		post: {
			...state.post,
			comments: [...state.post.comments],
		},
	};
};
