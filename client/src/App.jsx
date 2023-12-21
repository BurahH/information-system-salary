import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import LayOut from './layout/LayOut';

const App = observer(() => {
	return (
		<BrowserRouter>
			<LayOut>
				<AppRouter />
			</LayOut>
		</BrowserRouter>
	);
});

export default App;
