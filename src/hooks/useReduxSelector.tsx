import { useSelector } from "react-redux";
import { State } from "../redux/store";

const useReduxSelector = () => {
	const mapStateToProps = (state: State) => ({
		data: state.data,
		UI: state.UI,
		user: state.user,
	});
	const data = useSelector(mapStateToProps);

	return data;
};

export default useReduxSelector;
