import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';

const App = observer(() => {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
});

export default App;
