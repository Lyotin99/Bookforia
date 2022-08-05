import { InitialStateData } from "../../utils/postInterfaces";

export interface isOpen {
	openDialog?: boolean;
}

export interface PropsData {
	getUserData: (username: string) => void;
	data: InitialStateData & isOpen;
	match: {
		params: {
			username: string;
			postId: string;
		};
	};
}
