import React, { useState } from 'react';

export default function RubricSelector() {
	const [selected, setSelected] = useState('');

	return (
		<div className='bg-gray-900 p-4 rounded-xl shadow-lg'>
			<label className='block mb-2 font-medium'>Select Rubric</label>
			<select
				value={selected}
				onChange={(e) => setSelected(e.target.value)}
				className='w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200'
			>
				<option value=''>-- Choose a Rubric --</option>
				<option value='writing101'>Writing 101</option>
				<option value='research'>Research Essay</option>
			</select>
		</div>
	);
}
