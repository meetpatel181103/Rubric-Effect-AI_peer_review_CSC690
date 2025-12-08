import { useState, useRef } from 'react';
import './App.css';
import EssayUploadSection from './EssayUploadSection.jsx';
import AboutPage from './AboutPage';
import ContactSection from './ContactSection';
import SignInPage from './SignInPage';
import RubricsSection from './RubricsSection.jsx';

function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'about' | 'contact' | 'signin'
  const [activeRubric, setActiveRubric] = useState(null);
  const [selectedRubric, setSelectedRubric] = useState(null);
  const rubricsRef = useRef(null);

  const navLinkClass = (page) =>
    `nav-link ${activePage === page ? 'nav-link-active' : ''}`;

  return (
    <div className='app-root'>
      {/* Top navbar */}
      <header className='top-nav'>
        <div className='nav-inner'>
          <div className='nav-logo'>Rubric-EFFECT</div>

          <nav className='nav-links'>
            <button
              type='button'
              className={navLinkClass('home')}
              onClick={() => setActivePage('home')}
            >
              Home
            </button>
            <button
              type='button'
              className={navLinkClass('about')}
              onClick={() => setActivePage('about')}
            >
              About
            </button>
            <button
              type='button'
              className={navLinkClass('contact')}
              onClick={() => setActivePage('contact')}
            >
              Contact
            </button>
          </nav>

          <button
            className={`nav-signin ${
              activePage === 'signin' ? 'nav-signin-active' : ''
            }`}
            type='button'
            onClick={() => setActivePage('signin')}
          >
            Sign in
          </button>
        </div>
      </header>

      {/* HOME PAGE */}
      {activePage === 'home' && (
        <>
          {/* Hero / header section */}
          <main className='hero-section'>
            <section className='hero-card'>
              <p className='project-name'>Rubric-EFFECT: AI Peer Review</p>

              <h1 className='hero-title'>
                Get clear, rubric-based feedback on your writing in seconds.
              </h1>

              <p className='hero-subtext'>
                Upload your essay, choose a rubric, and let our AI act as a
                consistent, transparent peer reviewer.
              </p>

              <button
                className='hero-cta'
                onClick={() => {
                  if (rubricsRef.current) {
                    rubricsRef.current.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                }}
              >
                Get started
              </button>

              <p className='privacy-note'>
                We don’t store your essays. Everything is processed in this
                session only.
              </p>
            </section>
          </main>

          {/* Rubrics section (moved to separate file) */}
          <RubricsSection
            rubricsRef={rubricsRef}
            selectedRubric={selectedRubric}
            setSelectedRubric={setSelectedRubric}
            activeRubric={activeRubric}
            setActiveRubric={setActiveRubric}
          />

          {/* Essay upload section */}
          <EssayUploadSection selectedRubric={selectedRubric} />
        </>
      )}

      {/* ABOUT PAGE */}
      {activePage === 'about' && <AboutPage />}

      {/* CONTACT PAGE */}
      {activePage === 'contact' && <ContactSection />}

      {/* SIGN IN PAGE */}
      {activePage === 'signin' && (
        <SignInPage onContinue={() => setActivePage('home')} />
      )}
    </div>
  );
}

export default App;
