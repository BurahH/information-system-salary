import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from '../main';
import { authRoutes, publicRoutes } from '../routes/routes';
import { AUTHORIZATION_ROUTE } from '../routes/consts';

const AppRouter = () => {
	const { user } = useContext(Context);

	return (
		<Routes>
      {publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}

			{user.isAuth &&
				authRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
        
			{!user.isAuth && <Route path="*" element={<Navigate to="/auth" />}/>}
		</Routes>
	);
};

export default AppRouter;
