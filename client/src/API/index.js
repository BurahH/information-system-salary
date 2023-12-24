import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SOME_KEY;

export const $API = axios.create({
	baseURL: BASE_URL,
});

const authInterceptor = config => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
};

$API.interceptors.request.use(authInterceptor);

export const handleApiError = async error => {
	try {
		const errorMessage =
			error.response?.data?.message || 'An unexpected error occurred.';
		const data = null;
		return { error: errorMessage, data };
	} catch (err) {
		throw new Error('An unexpected error occurred.');
	}
};
