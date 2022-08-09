import axios from "axios";

export const axiosGet = async (url: string) => {
	const getData = await axios
		.get(url)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});

	return getData;
};
