import React from 'react';
import UploadForm from '../components/UploadForm';
import RubricSelector from '../components/RubricSelector';

export default function Home() {
	return (
		<div className='min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-6'>
			<h1 className='text-3xl font-bold mb-6'>AI Peer Review</h1>
			<UploadForm />
			<div className='mt-6 w-full max-w-md'>
				<RubricSelector />
			</div>
		</div>
	);
}
