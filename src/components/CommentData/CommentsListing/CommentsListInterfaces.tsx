import { OnePostData, CommentsData } from "../../../utils/postInterfaces";

export interface DataPost {
	data: { post: OnePostData };
	user: { credentials: { username: string; imageUrl: string } };
}
export interface ReplyDataForm {
	body: string;
}

export interface Props {
	comments: CommentsData[];
}

export interface StateData {
	body: string;
}
