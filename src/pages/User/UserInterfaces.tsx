import { InitialStateData } from "../../utils/postInterfaces";

export interface isOpen {
	openDialog?: boolean;
}

export interface PropsData {
	data: InitialStateData;
	match: {
		params: {
			username: string;
			postId: string;
		};
	};
}
