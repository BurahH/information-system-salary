import { $API } from '.';

export const createEmployee = async ({
	personalNumber,
	name,
	position,
	salary,
	family,
	children,
}) => {
	const { data } = await $API.post('http://26.162.53.239:8080/employee/new', {
		personalNumber,
		name,
		position,
		salary,
		family,
		children,
	});
	return data;
};

export const getUsers = async () => {
	const { data } = await $API.get('http://26.162.53.239:8080/employee');
	return data;
};

export const getUserById = async id => {
	const { data } = await $API.get(
		`http://26.162.53.239:8080/employee/get/${id}`
	);
	return data;
};

export const getPayments = async (month, year) => {
	const { data } = await $API.get(
		`http://26.162.53.239:8080/payment?month=${month}&year=${year}`
	);
  return data;
};
