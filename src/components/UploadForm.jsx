import React, { useState } from 'react';

export default function UploadForm() {
	const [fileName, setFileName] = useState('');

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) setFileName(file.name);
	};

	return (
		<div className='w-full max-w-md bg-gray-900 p-4 rounded-xl shadow-lg'>
			<label className='block mb-2 font-medium'>Upload Essay</label>
			<input
				type='file'
				accept='.pdf,.txt'
				onChange={handleFileChange}
				className='w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200'
			/>
			{fileName && (
				<p className='text-sm text-green-400 mt-2'>Uploaded: {fileName}</p>
			)}
		</div>
	);
}
