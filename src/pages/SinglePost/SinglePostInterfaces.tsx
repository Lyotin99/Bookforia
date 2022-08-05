import { OnePostData, UIData } from "../../utils/postInterfaces";

export interface SinglePostProps {
	match: {
		params: {
			username: string;
			postId: string;
		};
	};
	post: OnePostData;
	UI: UIData;
}

export interface StateToPropsData {
	data: { post: OnePostData };
	UI: UIData;
	user: {
		credentials: {
			username: string;
		};
	};
}
