import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import LayOut from './layout/LayOut';

import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { checkAuth } from './API/userAPI';
import { Context } from './main';

const queryClient = new QueryClient();

const App = observer(() => {

  const { user } = useContext(Context)

  useEffect(() => {
    const check = async () => {
      try {
        const data = await checkAuth();
        user.setIsAuth(true);
        user.setUser({
          id: data.id,
          name: data.name,
          login: data.username,
          role: data.roles
        })

      } catch (e) {
        console.log(e)
      }
      
    }
    check();
  },[])

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<LayOut>
					<AppRouter />
				</LayOut>
			</QueryClientProvider>
		</BrowserRouter>
	);
});

export default App;
