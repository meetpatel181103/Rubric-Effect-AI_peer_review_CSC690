// src/ContactSection.jsx
function ContactSection() {
	return (
		<section className='contact-section'>
			<div className='contact-container'>
				{/* Left: info & team */}
				<div className='contact-info'>
					<h2 className='contact-title'>Contact the team</h2>
					<p className='contact-subtitle'>
						Rubric-Effect is a capstone project for SFSU CSC 690/698. If you
						have questions, feedback, or want to try this in a real course, we’d
						love to hear from you.
					</p>

					<div className='contact-cards'>
						<div className='contact-card'>
							<h3>Project scope</h3>
							<p>
								This prototype is designed for demo and research purposes. It
								should support, not replace, human feedback and grading.
							</p>
						</div>

						<div className='contact-card'>
							<h3>How to reach us</h3>
							<p>
								Please reach out by email with your name, course, and a short
								description of how you’d like to use Rubric-Effect.
							</p>
							<ul className='contact-list'>
								<li>Meet Patel — backend &amp; infrastructure</li>
								<li>Pritham Sandhu — frontend &amp; UX</li>
								<li>Nidhey Patel — product &amp; prompts</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Right: simple form (front-end only) */}
				<form
					className='contact-form'
					onSubmit={(e) => {
						e.preventDefault();
						alert(
							'This form is a prototype only. Please email the team directly for real contact.'
						);
					}}
				>
					<h3 className='contact-form-title'>Send us a note</h3>

					<label className='contact-label'>
						Name
						<input
							type='text'
							className='contact-input'
							placeholder='Your name'
						/>
					</label>

					<label className='contact-label'>
						Email
						<input
							type='email'
							className='contact-input'
							placeholder='you@example.com'
						/>
					</label>

					<label className='contact-label'>
						Message
						<textarea
							className='contact-textarea'
							rows={4}
							placeholder='Tell us how you might use Rubric-Effect or share feedback…'
						/>
					</label>

					<button type='submit' className='contact-submit'>
						Send message
					</button>

					<p className='contact-note'>
						This form does not send real emails yet — it&apos;s for demo only.
					</p>
				</form>
			</div>
		</section>
	);
}

export default ContactSection;
