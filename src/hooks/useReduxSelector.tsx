import { useSelector } from "react-redux";
import { UserData, UIData, InitialStateData } from "../utils/postInterfaces";

export interface StateToPropsData {
	data: InitialStateData;
	UI: UIData;
	user: UserData;
}

const useReduxSelector = () => {
	const mapStateToProps = (state: StateToPropsData) => ({
		data: state.data,
		UI: state.UI,
		user: state.user,
	});
	const data = useSelector(mapStateToProps);

	return data;
};

export default useReduxSelector;
