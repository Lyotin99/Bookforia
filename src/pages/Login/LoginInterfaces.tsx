import { LoginUIData, UserData, History } from "../../utils/postInterfaces";

export interface LoginProps {
	UI: LoginUIData;
	user: UserData;
	history: History;
}
