import axios from "axios";
import { Dispatch } from "redux";

export const axiosGet = (
	pathUrl: string,
	resultType: string,
	errorType: string,
	errorData: any,
	dispatch: Dispatch
): Promise<any> => {
	return axios
		.get(pathUrl, {
			headers: {
				Authorization: localStorage.getItem("FBIdToken"),
			},
		})
		.then((res) => {
			return dispatch({ type: resultType, payload: res.data });
		})
		.catch(() => {
			dispatch({
				type: errorType,
				payload: errorData,
			});
		});
};

export const axiosPost = (
	pathUrl: string,
	obj: any,
	resultType: string,
	errorType: string,
	dispatch: Dispatch
): Promise<any> => {
	return axios
		.post(pathUrl, obj, {
			headers: {
				Authorization: localStorage.getItem("FBIdToken"),
			},
		})
		.then((res) => {
			dispatch({
				type: resultType,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: errorType,
				payload: err.response.data,
			});
		});
};

export const axiosPostNoFetch = (pathUrl: string, obj: any): Promise<any> => {
	return axios.post(pathUrl, obj, {
		headers: {
			Authorization: localStorage.getItem("FBIdToken"),
		},
	});
};

export const axiosPut = (
	pathUrl: string,
	obj: any,
	resultType: string,
	errorType: string,
	dispatch: Dispatch
): Promise<any> => {
	return axios
		.put(pathUrl, obj, {
			headers: {
				Authorization: localStorage.getItem("FBIdToken"),
			},
		})
		.then((res) => {
			dispatch({
				type: resultType,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: errorType,
				payload: err.response.data,
			});
		});
};

interface AxiosDelete {
	commentId: string;
	replyId: string;
}

export const axiosDelete = (
	pathUrl: string,
	resultType: string,
	resultData: string | AxiosDelete,
	dispatch: Dispatch
): Promise<any> => {
	return axios
		.delete(pathUrl, {
			headers: {
				Authorization: localStorage.getItem("FBIdToken"),
			},
		})
		.then(() => {
			dispatch({
				type: resultType,
				payload: resultData,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
