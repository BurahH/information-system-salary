import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import LayOut from './layout/LayOut';

import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = observer(() => {
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
