import { useState } from 'react'
import './App.css'
import EssayUploadSection from './EssayUploadSection.jsx'


const RUBRICS = [
  {
    id: 'argumentative',
    name: 'Argumentative Essay Rubric',
    focus: 'Focus: thesis, evidence, organization, counterarguments.',
    shortDescription:
      'For persuasive or position papers. Evaluates thesis, evidence, organization, and counterarguments.',
    tableRows: [
      {
        criterion: 'Thesis Clarity',
        excellent: '4 – Clear, focused thesis stated early and maintained throughout.',
        proficient: '3 – Thesis is understandable but could be more specific.',
        developing: '2 – Thesis is vague, overly broad, or general.',
        beginning: '1–0 – No clear thesis identifiable.'
      },
      {
        criterion: 'Evidence & Support',
        excellent: '4 – Strong, relevant evidence with credible sources and clear explanations.',
        proficient: '3 – Adequate evidence with some explanation and mostly relevant sources.',
        developing: '2 – Limited or partially relevant evidence; links to claims are unclear.',
        beginning: '1–0 – Claims are unsupported or based mostly on opinion.'
      },
      {
        criterion: 'Organization & Flow',
        excellent: '4 – Ideas flow logically with smooth transitions between paragraphs.',
        proficient: '3 – Mostly logical structure; a few rough transitions.',
        developing: '2 – Some disorganized sections; ideas may feel jumpy.',
        beginning: '1–0 – Lacks clear structure; difficult to follow.'
      }
    ]
  },
  {
    id: 'analytical',
    name: 'Analytical Essay Rubric',
    focus: 'Focus: depth of analysis, reasoning, use of evidence.',
    shortDescription:
      'For close reading or analysis tasks. Emphasizes reasoning, insight, and how well evidence is interpreted.',
    tableRows: [
      {
        criterion: 'Depth of Analysis',
        excellent: '4 – Offers insightful, nuanced analysis that goes beyond summary.',
        proficient: '3 – Solid analysis with some insight; tends to stay close to the surface at times.',
        developing: '2 – Mostly summary with limited interpretation.',
        beginning: '1–0 – Minimal or no analysis; largely retells information.'
      },
      {
        criterion: 'Reasoning & Connections',
        excellent: '4 – Clear, logical reasoning; strong connections between ideas and claims.',
        proficient: '3 – Generally logical reasoning with a few weak or unclear links.',
        developing: '2 – Some confusing or unsupported leaps in logic.',
        beginning: '1–0 – Reasoning is unclear or largely missing.'
      },
      {
        criterion: 'Use of Evidence',
        excellent: '4 – Evidence is well-chosen and thoroughly explained.',
        proficient: '3 – Evidence is appropriate but explanations may be brief or uneven.',
        developing: '2 – Limited or partially relevant evidence with weak explanation.',
        beginning: '1–0 – Little to no evidence used.'
      }
    ]
  },
  {
    id: 'research',
    name: 'Research Essay Rubric',
    focus: 'Focus: sources, citation quality, academic integrity.',
    shortDescription:
      'For longer research projects. Evaluates quality of sources, citation practices, and ethical use of information.',
    tableRows: [
      {
        criterion: 'Source Quality',
        excellent: '4 – Uses high-quality, credible, and varied academic or professional sources.',
        proficient: '3 – Uses mostly credible sources with some variety.',
        developing: '2 – Limited number or range of credible sources.',
        beginning: '1–0 – Relies on low-quality, questionable, or few sources.'
      },
      {
        criterion: 'Citation & Formatting',
        excellent: '4 – Consistently accurate citation style with very few or no errors.',
        proficient: '3 – Mostly correct citations; minor, occasional errors.',
        developing: '2 – Frequent citation errors or inconsistencies.',
        beginning: '1–0 – Little or no attempt to cite sources properly.'
      },
      {
        criterion: 'Academic Integrity',
        excellent: '4 – Sources are clearly attributed; paraphrasing and quoting are ethical and accurate.',
        proficient: '3 – Minor attribution or paraphrasing issues, but no serious concerns.',
        developing: '2 – Some unclear attribution; borderline misuse of sources.',
        beginning: '1–0 – Serious concerns about plagiarism or misuse of sources.'
      }
    ]
  }
]

function RubricModal({ rubric, onClose }) {
  if (!rubric) return null

  return (
    <div className="rubric-modal-backdrop" onClick={onClose}>
      <div
        className="rubric-modal"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the modal
      >
        <div className="rubric-modal-header">
          <h2>{rubric.name}</h2>
          <p className="rubric-modal-focus">{rubric.focus}</p>
          <button className="rubric-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="rubric-modal-body">
          <table className="rubric-table">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Excellent (4)</th>
                <th>Proficient (3)</th>
                <th>Developing (2)</th>
                <th>Beginning (1–0)</th>
              </tr>
            </thead>
            <tbody>
              {rubric.tableRows.map((row) => (
                <tr key={row.criterion}>
                  <td className="rubric-criterion-cell">{row.criterion}</td>
                  <td>{row.excellent}</td>
                  <td>{row.proficient}</td>
                  <td>{row.developing}</td>
                  <td>{row.beginning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeRubric, setActiveRubric] = useState(null)
  const [selectedRubric, setSelectedRubric] = useState(null)

  return (
    <div className="app-root">
      {/* Top navbar */}
      <header className="top-nav">
        <div className="nav-inner">
          <div className="nav-logo">Rubric-EFFECT</div>

          <nav className="nav-links">
            <a href="#hero" className="nav-link active">
              Home
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>

          <button className="nav-signin">Sign in</button>
        </div>
      </header>

      {/* Hero / header section */}
      <main id="hero" className="hero-section">
        <section className="hero-card">
          <p className="project-name">Rubric-EFFECT: AI Peer Review</p>

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

      {/* Rubrics selection section */}
      {/* <section className="rubrics-section">
        <div className="rubrics-inner">
          <h2 className="rubrics-heading">Choose a rubric to start</h2>
          <p className="rubrics-subheading">
            Pick the type of essay you&apos;re working on. You can always change rubrics later.
          </p>

          <div className="rubrics-grid">
            {RUBRICS.map((rubric) => (
              <div
                key={rubric.id}
                className="rubric-card"
              >
                <h3 className="rubric-title">{rubric.name}</h3>
                <p className="rubric-focus">{rubric.focus}</p>
                <p className="rubric-description">{rubric.shortDescription}</p>
                <button
                  className="rubric-button"
                  onClick={() => setActiveRubric(rubric)}
                >
                  View details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="rubrics-section">
        <div className="rubrics-inner">
          <div className="rubrics-grid">
            {RUBRICS.map((rubric) => (
              <div
                key={rubric.id}
                className={`rubric-card ${selectedRubric?.id === rubric.id ? 'selected' : ''}`}
                onClick={() => setSelectedRubric(rubric)}
              >

                <h3 className="rubric-title">{rubric.name}</h3>
                <p className="rubric-focus">{rubric.focus}</p>
                <p className="rubric-description">{rubric.shortDescription}</p>
                <button
                  className="rubric-button"
                  onClick={() => setActiveRubric(rubric)}
                >
                  View details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: essay upload section */}
      <EssayUploadSection />

      {/* Modal */}
      <RubricModal rubric={activeRubric} onClose={() => setActiveRubric(null)} />
    </div>
  )
}

export default App

