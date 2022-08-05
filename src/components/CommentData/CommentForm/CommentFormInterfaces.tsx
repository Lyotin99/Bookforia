import { OnePostData, UIData } from "../../../utils/postInterfaces";

export interface CommentFormProps {
	postId: string;
	user?: UserData;
	UI?: UIData;
	post?: OnePostData;
}

export interface StateToPropsData {
	user?: UserData;
	UI?: { errors: { comment: string } };
	data: { post: OnePostData };
}

export interface UserData {
	authenticated: boolean;
}
export interface CommentFormState {
	body: string;
}
