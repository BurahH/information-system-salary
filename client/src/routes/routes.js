import Authorization from '../pages/Authorization';
import Users from '../pages/Users';
import { AUTHORIZATION_ROUTE, USERS_ROUTE } from './consts';

export const publicRoutes = [
	{
		path: AUTHORIZATION_ROUTE,
		Component: Authorization,
	},
];

export const authRoutes = [
	{
		path: USERS_ROUTE,
		Component: Users,
	},
];
