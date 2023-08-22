import axios from "axios";
const baseURL = "http://localhost:3001";

const axiosInstance = axios.create({ baseURL: baseURL });

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) =>
		Promise.reject(
			(error.response && error.response.data) || "Something went wrong"
		)
);

export default axiosInstance;
