import React from 'react';
import NavBar from '../components/NavBar';

const LayOut = ({ children }) => {
	return (
		<>
			<NavBar />
			{children}
		</>
	);
};

export default LayOut;
