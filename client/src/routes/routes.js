import Authorization from '../pages/Authorization';
import NewAdmin from '../pages/NewAdmin';
import NewUser from '../pages/NewUser';
import Payments from '../pages/Payments';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
import { AUTHORIZATION_ROUTE, NEW_ADMIN_ROUTE, NEW_USER_ROUTE, PAYMENTS_ROUTE, PROFILE_ROUTE, USERS_ROUTE } from './consts';

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
  {
    path: PAYMENTS_ROUTE,
    Component: Payments
  },
  {
    path: PROFILE_ROUTE + '/:id',
    Component: Profile
  },
  {
    path: NEW_USER_ROUTE,
    Component: NewUser
  },
  {
    path: NEW_ADMIN_ROUTE,
    Component: NewAdmin
  },

];
