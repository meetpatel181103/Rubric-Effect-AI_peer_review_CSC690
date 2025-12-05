// import { useRef, useState } from 'react'

// function EssayUploadSection({ selectedRubric }) {
//   const [essayText, setEssayText] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [showResults, setShowResults] = useState(false)
//   const [uploadedFileName, setUploadedFileName] = useState('')
//   const [errorMessage, setErrorMessage] = useState('')
//   const fileInputRef = useRef(null)
//   const resultsRef = useRef(null)

//   const handleUploadClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click()
//     }
//   }

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0]
//     if (!file) return

//     setUploadedFileName(file.name)
//     // For now we just show the file name in the textarea as a placeholder.
//     // Later you can replace this with extracted text.
//     setEssayText(`Uploaded file: ${file.name}`)
//     setErrorMessage('') // clear error if any
//   }

//   const handleGoClick = () => {
//     if (isSubmitting) return

//     // --- Validation checks ---
//     if (!selectedRubric) {
//       setErrorMessage('Please choose a rubric before starting.')
//       return
//     }

//     if (!essayText.trim() && !uploadedFileName) {
//       setErrorMessage('Please paste your essay or upload a file before starting.')
//       return
//     }

//     // All good: clear errors, start "submission"
//     setErrorMessage('')
//     setIsSubmitting(true)
//     setShowResults(false)

//     // TODO: replace timeout with real API call
//     setTimeout(() => {
//       setIsSubmitting(false)
//       setShowResults(true)

//       // Smooth scroll to results
//       setTimeout(() => {
//         if (resultsRef.current) {
//           resultsRef.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start',
//           })
//         }
//       }, 150)
//     }, 1500)
//   }

//   return (
//     <>
//       {/* Upload / GO section */}
//       <section className="upload-section">
//         <div className="upload-card">
//           {/* LEFT SIDE: textarea + upload button */}
//           <div className="upload-left">
//             <textarea
//               className="essay-textarea"
//               placeholder="Paste your essay text here..."
//               value={essayText}
//               onChange={(e) => {
//                 setEssayText(e.target.value)
//                 if (e.target.value.trim()) {
//                   setErrorMessage('')
//                 }
//               }}
//             />

//             <button
//               type="button"
//               className="upload-button"
//               onClick={handleUploadClick}
//             >
//               Upload your essay
//             </button>

//             {/* Show selected file name */}
//             {uploadedFileName && (
//               <div className="upload-file-info">
//                 <span className="upload-file-label">Selected file:</span>
//                 <span className="upload-file-name">{uploadedFileName}</span>
//               </div>
//             )}

//             {/* Hidden file input */}
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept=".pdf,.doc,.docx,.txt"
//               style={{ display: 'none' }}
//               onChange={handleFileChange}
//             />
//           </div>

//           {/* RIGHT SIDE: GO button with blue ring + error message */}
//           <div className="upload-right">
//             <button
//               type="button"
//               className="go-button-wrapper"
//               onClick={handleGoClick}
//             >
//               <span
//                 className={`go-button-ring ${
//                   isSubmitting ? 'go-button-ring--spinning' : ''
//                 }`}
//               >
//                 <span className="go-button-inner">
//                   {isSubmitting ? '...' : 'GO'}
//                 </span>
//               </span>
//             </button>

//             {errorMessage && (
//               <p className="upload-error-message">{errorMessage}</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Results section (hidden until GO pressed) */}
//       {showResults && (
//         <section ref={resultsRef} className="results-section">
//           <div className="results-card">
//             <p className="results-heading">
//               Great start! You&apos;ve got a solid foundation. With a few
//               focused revisions, this essay can become even clearer and more
//               convincing.
//             </p>

//             <h3 className="results-rubric-title">
//               Argumentative Essay Rubric
//             </h3>

//             <div className="results-table-wrapper">
//               <table className="rubric-table results-table">
//                 <thead>
//                   <tr>
//                     <th>Criterion</th>
//                     <th>Excellent (4)</th>
//                     <th>Proficient (3)</th>
//                     <th className="rubric-level-highlight">Developing (2)</th>
//                     <th>Beginning (1–0)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="rubric-criterion-cell">Thesis Clarity</td>
//                     <td>
//                       4 – Clear, focused thesis stated early and maintained
//                       throughout.
//                     </td>
//                     <td>
//                       3 – Thesis is understandable but could be more specific.
//                     </td>
//                     <td className="rubric-level-highlight">
//                       2 – Thesis is vague, overly broad, or general.
//                     </td>
//                     <td>1–0 – No clear thesis identifiable.</td>
//                   </tr>
//                   <tr>
//                     <td className="rubric-criterion-cell">
//                       Evidence &amp; Support
//                     </td>
//                     <td>
//                       4 – Strong, relevant evidence with credible sources and
//                       clear explanations.
//                     </td>
//                     <td>
//                       3 – Adequate evidence with some explanation and mostly
//                       relevant sources.
//                     </td>
//                     <td className="rubric-level-highlight">
//                       2 – Limited or partially relevant evidence; links to
//                       claims are unclear.
//                     </td>
//                     <td>1–0 – Claims are unsupported or based mostly on opinion.</td>
//                   </tr>
//                   <tr>
//                     <td className="rubric-criterion-cell">
//                       Organization &amp; Flow
//                     </td>
//                     <td>
//                       4 – Ideas flow logically with smooth transitions between
//                       paragraphs.
//                     </td>
//                     <td>
//                       3 – Mostly logical structure; a few rough transitions.
//                     </td>
//                     <td className="rubric-level-highlight">
//                       2 – Some disorganized sections; ideas may feel jumpy.
//                     </td>
//                     <td>
//                       1–0 – Lacks clear structure; difficult for the reader to
//                       follow.
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <p className="results-advice">
//               <strong>How to keep improving:</strong> Start by sharpening your
//               thesis into a specific, arguable claim that clearly expresses your
//               position. Then, review each paragraph and make sure it directly
//               supports that thesis with concrete evidence—quotations, data, or
//               clearly described examples. Add a short explanation after each
//               piece of evidence so your reader understands exactly how it proves
//               your point. Finally, use transitions at the beginnings and ends of
//               paragraphs to connect your ideas and create a smoother, more
//               confident flow from start to finish.
//             </p>
//           </div>
//         </section>
//       )}
//     </>
//   )
// }

// export default EssayUploadSection


import { useRef, useState } from 'react'

function getMotivationalMessage(result) {
  if (!result) return ''

  const ratio = result.overall_score / result.max_score

  if (ratio >= 0.75) {
    return "Great work! Your essay is already strong—these tweaks will help you polish it even further."
  } else if (ratio >= 0.5) {
    return "Great start! You’ve got a solid foundation. With a few focused revisions, this essay can become even clearer and more convincing."
  } else {
    return "You’ve taken an important first step by getting your ideas down. With some structured revisions, you can turn this into a much stronger essay."
  }
}

function EssayUploadSection({ selectedRubric }) {
  const [essayText, setEssayText] = useState('')
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [reviewResult, setReviewResult] = useState(null)
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

    setUploadedFileName(file.name)
    // For now we just show the file name in the textarea as a placeholder.
    // Later you'll replace this with extracted text from the file.
    setEssayText(`Uploaded file: ${file.name}`)
    setErrorMessage('')
  }

  const handleGoClick = async () => {
    if (isSubmitting) return

    // --- Validation ---
    if (!selectedRubric) {
      setErrorMessage('Please choose a rubric before starting.')
      return
    }

    if (!essayText.trim() && !uploadedFileName) {
      setErrorMessage('Please paste your essay or upload a file before starting.')
      return
    }

    setErrorMessage('')
    setIsSubmitting(true)
    setReviewResult(null)

    try {
      const payload = {
        rubric_id: selectedRubric.id ?? selectedRubric.rubric_id ?? 'argumentative_essay_v1',
        // For now send whatever is in essayText.
        // Later, if only a file is uploaded, you can send the extracted text instead.
        essay_text: essayText || `Uploaded file: ${uploadedFileName}`,
      }

      const response = await fetch('http://localhost:8000/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      setReviewResult(data)

      // Smooth scroll to results
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }, 150)
    } catch (err) {
      console.error(err)
      setErrorMessage('Something went wrong while running the review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
              onChange={(e) => {
                setEssayText(e.target.value)
                if (e.target.value.trim()) {
                  setErrorMessage('')
                }
              }}
            />

            <button
              type="button"
              className="upload-button"
              onClick={handleUploadClick}
            >
              Upload your essay
            </button>

            {/* Selected file name */}
            {uploadedFileName && (
              <div className="upload-file-info">
                <span className="upload-file-label">Selected file:</span>
                <span className="upload-file-name">{uploadedFileName}</span>
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {/* RIGHT SIDE: GO button + error */}
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

            {errorMessage && (
              <p className="upload-error-message">{errorMessage}</p>
            )}
          </div>
        </div>
      </section>

      {/* Results section – visible only when reviewResult is set */}
      {reviewResult && (
        <section ref={resultsRef} className="results-section">
          <div className="results-card">
            <p className="results-heading">
              {getMotivationalMessage(reviewResult)}
            </p>

            <h3 className="results-rubric-title">
              {selectedRubric?.name ?? 'Argumentative Essay Rubric'}
            </h3>

            <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#4b5563' }}>
              Overall score: <strong>{reviewResult.overall_score}</strong> / {reviewResult.max_score}
            </p>

            <div className="results-table-wrapper">
              {/* Table identical to rubric modal structure */}
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

            {/* Use backend comments in a friendlier paragraph */}
            <p className="results-advice">
              <strong>How to keep improving:</strong>{' '}
              {reviewResult.criteria
                .map((c) => c.comment)
                .join(' ')}
            </p>
          </div>
        </section>
      )}
    </>
  )
}

export default EssayUploadSection
