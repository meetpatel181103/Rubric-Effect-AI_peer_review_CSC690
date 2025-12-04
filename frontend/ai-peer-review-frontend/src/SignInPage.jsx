// src/SignInPage.jsx

function SignInPage({ onContinue }) {
	return (
		<main className='signin-page'>
			<div className='signin-container'>
				{/* Left side: intro / context */}
				<section className='signin-info'>
					<h1 className='signin-title'>Sign in to Rubric-Effect</h1>
					<p className='signin-subtitle'>
						This prototype sign-in screen is for demo purposes only. In a real
						deployment, instructors and students would sign in with campus
						accounts to save rubrics, runs, and feedback history.
					</p>

					<ul className='signin-list'>
						<li>Keep track of multiple essay submissions</li>
						<li>Compare AI feedback across drafts</li>
						<li>Share runs with instructors or TAs</li>
					</ul>

					{onContinue && (
						<button
							type='button'
							className='signin-ghost-button'
							onClick={onContinue}
						>
							Continue without signing in
						</button>
					)}
				</section>

				{/* Right side: fake auth form */}
				<section className='signin-card'>
					<h2 className='signin-card-title'>Sign in (demo only)</h2>
					<p className='signin-card-text'>
						No real accounts are created here. This is a front-end mock to show
						where authentication would live.
					</p>

					<form
						className='signin-form'
						onSubmit={(e) => {
							e.preventDefault();
							alert('Demo only — real authentication is not wired up yet.');
						}}
					>
						<label className='signin-label'>
							Email
							<input
								type='email'
								className='signin-input'
								placeholder='you@sfsu.edu'
								required
							/>
						</label>

						<label className='signin-label'>
							Password
							<input
								type='password'
								className='signin-input'
								placeholder='••••••••'
								required
							/>
						</label>

						<div className='signin-row'>
							<label className='signin-remember'>
								<input type='checkbox' />
								<span>Remember me for this demo</span>
							</label>

							<button
								type='button'
								className='signin-link-button'
								onClick={() =>
									alert('Password reset is not implemented in this prototype.')
								}
							>
								Forgot password?
							</button>
						</div>

						<button type='submit' className='signin-submit'>
							Sign in
						</button>

						<p className='signin-disclaimer'>
							For the capstone, you can skip sign in and use the tool directly.
						</p>
					</form>
				</section>
			</div>
		</main>
	);
}

export default SignInPage;
