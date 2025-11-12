import React from 'react';
import ResultView from '../components/ResultView';

export default function Results() {
	return (
		<div className='min-h-screen bg-gray-950 text-gray-100 p-8'>
			<h2 className='text-2xl font-semibold mb-4'>Feedback Results</h2>
			<ResultView />
		</div>
	);
}
