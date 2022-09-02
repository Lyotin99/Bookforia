import axios from "axios";
import { Dispatch } from "redux";

export function axiosGet<T>(
	pathUrl: string,
	resultType: string,
	errorType: string,
	dispatch: Dispatch
): Promise<void | { payload: T }> {
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
				payload: [],
			});
		});
}

export function axiosPost<T>(
	pathUrl: string,
	obj: T,
	resultType: string,
	errorType: string,
	dispatch: Dispatch
): Promise<void | { payload: T }> {
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
}

export function axiosPostNoFetch<T>(pathUrl: string, obj: T): Promise<T> {
	return axios.post(pathUrl, obj, {
		headers: {
			Authorization: localStorage.getItem("FBIdToken"),
		},
	});
}

export function axiosPut<T>(
	pathUrl: string,
	obj: T,
	resultType: string,
	errorType: string,
	dispatch: Dispatch
): Promise<void | { payload: T }> {
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
}

interface AxiosDelete {
	commentId: string;
	replyId: string;
}

export function axiosDelete<T>(
	pathUrl: string,
	resultType: string,
	resultData: string | AxiosDelete,
	dispatch: Dispatch
): Promise<void | { payload: T }> {
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
}
