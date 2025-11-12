import React from 'react';

export default function ResultView() {
	return (
		<div className='bg-gray-900 p-6 rounded-xl shadow-lg'>
			<p className='text-sm text-gray-400 mb-2'>
				Criterion: Clarity (Score: 4/5)
			</p>
			<ul className='list-disc list-inside text-gray-200'>
				<li>Strong thesis statement.</li>
				<li>Some sentences need citation support.</li>
			</ul>
			<div className='mt-4 p-3 bg-gray-800 rounded'>
				<p className='text-sm italic text-gray-300'>
					Suggested Rewrite: “This argument would be stronger with a source
					citation after this claim.”
				</p>
			</div>
		</div>
	);
}
