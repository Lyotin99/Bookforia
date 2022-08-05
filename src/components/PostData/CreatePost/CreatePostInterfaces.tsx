export interface ErrorsData {
	body: string;
}
export interface UIData {
	loading: boolean;
	errors: ErrorsData;
}
export interface NewPostData {
	body: string;
}
export interface CreatePostProps {
	UI: UIData;
	user?: {
		credentials: {
			username: string;
		};
	};
	createPost: (body: NewPostData) => void;
	cleanErrors: () => void;
}

export interface CreatePostState {
	open: boolean;
	body: string;
	errors: ErrorsData;
}
