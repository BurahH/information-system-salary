import { $API } from '.';

export const createNewEmployee = async (
	personalNumber,
	name,
	position,
	salary,
	family,
	children
) => {
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

export const createNewUser = async (
	personalNumber,
	name,
	position,
	salary,
	family,
	children,
	username,
	password,
	roles
) => {
	const { data } = await $API.post('http://26.162.53.239:8080/user/new', {
		personalNumber,
		name,
		position,
		salary,
		family,
		children,
		username,
		password,
		roles,
	});

	return data;
};

export const loginUser = async (username, password) => {
  console.log(username, password)
	const { data } = await $API.post('http://26.162.53.239:8080/authenticate', {
		username,
		password,
	});
	return data;
};

export const getUsers = async () => {
  console.log('GET USERS ОТРАБАТЫВАЕТ')
	const { data } = await $API.get('http://26.162.53.239:8080/employee');
	return data;
};

export const getUserById = async id => {
	const { data } = await $API.get(
		`http://26.162.53.239:8080/employee/get/${id}`
	);
	return data;
};

export const getBonusesByUserId = async id => {
	const { data } = await $API.get(
		`http://26.162.53.239:8080/user/get/Allowance/${id}`
	);
	return data;
};

export const getDiseasesByUserId = async id => {
	const { data } = await $API.get(
		`http://26.162.53.239:8080/user/get/Disease/${id}`
	);
	return data;
};

export const createNewDisease = async (id, dateBegin, dateEnd, information) => {
	const { data } = await $API.post(
		`http://26.162.53.239:8080/diseance/new?id=${id}`,
		{ dateBegin, dateEnd, information }
	);
	return data;
};

export const createNewBonus = async (id, summa, information, date) => {
	const { data } = await $API.post(
		`http://26.162.53.239:8080/Allowance/new?id=${id}`,
		{ summa, information, date }
	);
	return data;
};
