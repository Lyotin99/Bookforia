import { Actions } from "../../types";
import { ActionType } from "./uiTypes";

const initialState = {
	loading: false,
	errors: null,
};

const userInterface = (state = initialState, action: ActionType) => {
	switch (action.type) {
		case Actions.SET_ERRORS:
			return {
				...state,
				loading: false,
				errors: action.payload,
			};
		case Actions.CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: null,
			};
		case Actions.LOADING_UI:
			return {
				...state,
				loading: true,
			};
		case Actions.STOP_LOADING_UI:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default userInterface;
