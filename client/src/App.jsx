import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './main';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const {user} = useContext(Context)
  console.log(user.isAuth)

	return <div>HELLO WORLD</div>
});

export default App;
