// import { useRef, useState } from 'react'

// function EssayUploadSection() {
//   const [essayText, setEssayText] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const fileInputRef = useRef(null)

//   const handleUploadClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click()
//     }
//   }

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0]
//     if (!file) return

//     // For now we just show the file name.
//     // Later you can parse the file and put its text into essayText.
//     setEssayText(`Uploaded file: ${file.name}`)
//   }

//   const handleGoClick = () => {
//     if (isSubmitting) return

//     setIsSubmitting(true)

//     // TODO: Replace this with your real API call.
//     // When your backend response arrives, call setIsSubmitting(false).
//     setTimeout(() => {
//       setIsSubmitting(false)
//     }, 2000)
//   }

//   return (
//     <section className="upload-section">
//       <div className="upload-card">
//         {/* LEFT SIDE: textarea + upload button */}
//         <div className="upload-left">
//           <textarea
//             className="essay-textarea"
//             placeholder="Paste your essay text here..."
//             value={essayText}
//             onChange={(e) => setEssayText(e.target.value)}
//           />

//           <button
//             type="button"
//             className="upload-button"
//             onClick={handleUploadClick}
//           >
//             Upload your essay
//           </button>

//           {/* Hidden file input */}
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".pdf,.doc,.docx,.txt"
//             style={{ display: 'none' }}
//             onChange={handleFileChange}
//           />
//         </div>

//         {/* RIGHT SIDE: GO button with blue ring */}
//         <div className="upload-right">
//           <button
//             type="button"
//             className="go-button-wrapper"
//             onClick={handleGoClick}
//           >
//             <span
//               className={`go-button-ring ${
//                 isSubmitting ? 'go-button-ring--spinning' : ''
//               }`}
//             >
//               <span className="go-button-inner">
//                 {isSubmitting ? '...' : 'GO'}
//               </span>
//             </span>
//           </button>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default EssayUploadSection

import { useRef, useState } from 'react'

function EssayUploadSection() {
  const [essayText, setEssayText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const fileInputRef = useRef(null)
  const resultsRef = useRef(null)


  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // For now we just show the file name.
    // Later you can parse the file and put its text into essayText.
    setEssayText(`Uploaded file: ${file.name}`)
  }

  const handleGoClick = () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    // TODO: replace with real API call.
    // When the backend responds, setIsSubmitting(false) and setShowResults(true)
    setTimeout(() => {
        setIsSubmitting(false)
        setShowResults(true)

        // Wait a moment for React to render the results section
        setTimeout(() => {
            if (resultsRef.current) {
            resultsRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
        }, 150) // small delay ensures DOM is ready
    }, 1500)

  }

  return (
    <>
      {/* Upload / GO section */}
      <section className="upload-section">
        <div className="upload-card">
          {/* LEFT SIDE: textarea + upload button */}
          <div className="upload-left">
            <textarea
              className="essay-textarea"
              placeholder="Paste your essay text here..."
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
            />

            <button
              type="button"
              className="upload-button"
              onClick={handleUploadClick}
            >
              Upload your essay
            </button>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {/* RIGHT SIDE: GO button with blue ring */}
          <div className="upload-right">
            <button
              type="button"
              className="go-button-wrapper"
              onClick={handleGoClick}
            >
              <span
                className={`go-button-ring ${
                  isSubmitting ? 'go-button-ring--spinning' : ''
                }`}
              >
                <span className="go-button-inner">
                  {isSubmitting ? '...' : 'GO'}
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Results section (hidden until GO pressed) */}
      {showResults && (
        <section ref={resultsRef} className="results-section">
          <div className="results-card">
            <p className="results-heading">
              Great start! You&apos;ve got a solid foundation. With a few focused
              revisions, this essay can become even clearer and more convincing.
            </p>

            <h3 className="results-rubric-title">
              Argumentative Essay Rubric
            </h3>

            <div className="results-table-wrapper">
              <table className="rubric-table results-table">
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>Excellent (4)</th>
                    <th>Proficient (3)</th>
                    <th className="rubric-level-highlight">Developing (2)</th>
                    <th>Beginning (1–0)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="rubric-criterion-cell">Thesis Clarity</td>
                    <td>
                      4 – Clear, focused thesis stated early and maintained
                      throughout.
                    </td>
                    <td>
                      3 – Thesis is understandable but could be more specific.
                    </td>
                    <td className="rubric-level-highlight">
                      2 – Thesis is vague, overly broad, or general.
                    </td>
                    <td>1–0 – No clear thesis identifiable.</td>
                  </tr>
                  <tr>
                    <td className="rubric-criterion-cell">
                      Evidence &amp; Support
                    </td>
                    <td>
                      4 – Strong, relevant evidence with credible sources and
                      clear explanations.
                    </td>
                    <td>
                      3 – Adequate evidence with some explanation and mostly
                      relevant sources.
                    </td>
                    <td className="rubric-level-highlight">
                      2 – Limited or partially relevant evidence; links to
                      claims are unclear.
                    </td>
                    <td>1–0 – Claims are unsupported or based mostly on opinion.</td>
                  </tr>
                  <tr>
                    <td className="rubric-criterion-cell">
                      Organization &amp; Flow
                    </td>
                    <td>
                      4 – Ideas flow logically with smooth transitions between
                      paragraphs.
                    </td>
                    <td>
                      3 – Mostly logical structure; a few rough transitions.
                    </td>
                    <td className="rubric-level-highlight">
                      2 – Some disorganized sections; ideas may feel jumpy.
                    </td>
                    <td>
                      1–0 – Lacks clear structure; difficult for the reader to
                      follow.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="results-advice">
              <strong>How to keep improving:</strong> Start by sharpening your
              thesis into a specific, arguable claim that clearly expresses your
              position. Then, review each paragraph and make sure it directly
              supports that thesis with concrete evidence—quotations, data, or
              clearly described examples. Add a short explanation after each
              piece of evidence so your reader understands exactly how it proves
              your point. Finally, use transitions at the beginnings and ends of
              paragraphs to connect your ideas and create a smoother, more
              confident flow from start to finish.
            </p>
          </div>
        </section>
      )}
    </>
  )
}

export default EssayUploadSection
