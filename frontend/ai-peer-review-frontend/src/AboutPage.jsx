// src/AboutPage.jsx

function AboutPage() {
	return (
		<main className='about-page'>
			<div className='about-container'>
				{/* Hero */}
				<section className='about-hero'>
					<div className='about-hero-text'>
						<p className='about-pill'>Capstone · CSC 690/698 · Fall 2025</p>
						<h1 className='about-title'>Rubric-Effect: AI Peer Review</h1>
						<p className='about-subtitle'>
							An AI-powered rubric-based peer reviewer that turns essays into
							clear, rubric-aligned feedback in seconds.
						</p>

						<div className='about-hero-tags'>
							<span>Fast feedback</span>
							<span>Rubric-aligned scores</span>
							<span>Citation flags</span>
						</div>
					</div>

					<div className='about-hero-card'>
						<h2>What it does</h2>
						<p>
							Students upload a PDF or paste their essay, choose a rubric, and
							get:
						</p>
						<ul>
							<li>Scores for each rubric criterion</li>
							<li>Plain-language comments they can revise from</li>
							<li>Suggested rewrites for weak paragraphs</li>
							<li>Sentences that probably need citations</li>
						</ul>
					</div>
				</section>

				{/* Problem / solution */}
				<section className='about-grid'>
					<article className='about-card'>
						<h3>Why we built this</h3>
						<p>
							In large classes, instructors and TAs spend a huge amount of time
							coordinating peer review instead of giving high-value coaching. At
							the same time, a lot of student-to-student feedback is vague,
							inconsistent, or even contradictory.
						</p>
						<p>
							Our goal is to give every student fast, rubric-aligned feedback
							they can actually use to revise—without adding more overhead for
							instructors.
						</p>
					</article>

					<article className='about-card'>
						<h3>How it helps</h3>
						<ul className='about-list'>
							<li>Standardizes feedback around a shared rubric</li>
							<li>Reduces turnaround from weeks to seconds</li>
							<li>Surfaces concrete next steps instead of vague comments</li>
							<li>Flags unsupported claims that may need citations</li>
						</ul>
					</article>
				</section>

				{/* Workflow */}
				<section className='about-section'>
					<h2 className='about-section-title'>Workflow at a glance</h2>
					<div className='about-steps'>
						<div className='about-step'>
							<span className='about-step-number'>1</span>
							<h4>Upload or paste</h4>
							<p>
								Students upload a PDF/TXT or paste their essay text directly
								into the site.
							</p>
						</div>
						<div className='about-step'>
							<span className='about-step-number'>2</span>
							<h4>Select a rubric</h4>
							<p>
								Choose the rubric that matches the assignment: argumentative,
								analytical, or research-focused.
							</p>
						</div>
						<div className='about-step'>
							<span className='about-step-number'>3</span>
							<h4>AI scoring &amp; feedback</h4>
							<p>
								The backend sends the essay and rubric to an AI model, which
								returns scores, comments, rewrites, and citation flags.
							</p>
						</div>
						<div className='about-step'>
							<span className='about-step-number'>4</span>
							<h4>Revise with confidence</h4>
							<p>
								Students use the feedback to revise their draft or discuss it
								with their instructor.
							</p>
						</div>
					</div>
				</section>

				{/* Team */}
				<section className='about-section'>
					<h2 className='about-section-title'>Team</h2>
					<div className='about-team'>
						<div className='about-team-member'>
							<h4>Meet Patel</h4>
							<p className='about-team-role'>Backend Lead</p>
							<p>
								FastAPI services, text parsing for PDFs/DOCX/TXT, database
								design, and overall system reliability.
							</p>
						</div>
						<div className='about-team-member'>
							<h4>Pritham Sandhu</h4>
							<p className='about-team-role'>Frontend &amp; UX Lead</p>
							<p>
								React interface, upload and results views, interaction design,
								and overall usability.
							</p>
						</div>
						<div className='about-team-member'>
							<h4>Nidhey Patel</h4>
							<p className='about-team-role'>Product &amp; Prompts</p>
							<p>
								Rubric JSON design, prompt engineering, evaluation of AI
								outputs, and documentation of limitations.
							</p>
						</div>
					</div>
				</section>

				{/* Footer note */}
				<section className='about-section about-footer-note'>
					<p>
						Built as a capstone project for <strong>SFSU CSC 690/698</strong>.
						This is a prototype and should be used to support, not replace,
						human judgment.
					</p>
				</section>
			</div>
		</main>
	);
}

export default AboutPage;
