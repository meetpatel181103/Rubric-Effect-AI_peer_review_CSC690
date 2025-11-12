import React from 'react';
import Home from './pages/Home';
import Results from './pages/Results';

function App() {
	return (
		<div className='font-sans bg-gray-950 min-h-screen text-gray-100'>
			<Home />
			<div className='border-t border-gray-800 my-10' />
			<Results />
		</div>
	);
}

export default App;
