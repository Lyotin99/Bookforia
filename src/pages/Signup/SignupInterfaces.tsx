import {
	SignupUIData,
	SignupErrorsData,
	UserData,
	History,
} from "../../utils/postInterfaces";

export interface SignupProps {
	UI: SignupUIData;
	user?: UserData;
	history?: History;
}
