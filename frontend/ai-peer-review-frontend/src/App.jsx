import { useState } from 'react'

import './App.css'

function App() {
  return (
    <div className="app-root">
      {/* Top navbar */}
      <header className="top-nav">
        <div className="nav-inner">
          <div className="nav-logo">Rubric-EFFECT</div>

          <nav className="nav-links">
            <a href="#" className="nav-link active">Home</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact</a>
          </nav>

          <button className="nav-signin">Sign in</button>
        </div>
      </header>

      {/* Hero / header section */}
      <main className="hero-section">
        <section className="hero-card">
          <p className="project-name">
            Rubric-EFFECT: AI Peer Review
          </p>

          <h1 className="hero-title">
            Get clear, rubric-based feedback on your writing in seconds.
          </h1>

          <p className="hero-subtext">
            Upload your essay, choose a rubric, and let our AI act as a
            consistent, transparent peer reviewer.
          </p>

          <button className="hero-cta">Get started</button>

          <p className="privacy-note">
            We don’t store your essays. Everything is processed in this session only.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
