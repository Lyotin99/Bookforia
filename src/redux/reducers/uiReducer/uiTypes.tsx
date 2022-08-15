import { UIErrors } from "../../../utils/Interfaces";
import { Actions } from "../../types";

export type ActionType = SetErrors | ClearErrors | LoadingUI | StopLoadingUi;

interface SetErrors {
	type: Actions.SET_ERRORS;
	payload: UIErrors;
}

interface ClearErrors {
	type: Actions.CLEAR_ERRORS;
}

interface LoadingUI {
	type: Actions.LOADING_UI;
}

interface StopLoadingUi {
	type: Actions.STOP_LOADING_UI;
}
