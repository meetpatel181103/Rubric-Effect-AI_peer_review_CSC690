// import { useRef, useState } from 'react'

// function getMotivationalMessage(result) {
//   if (!result) return ''

//   const ratio = result.overall_score / result.max_score

//   if (ratio >= 0.75) {
//     return 'Great work! Your essay is already strong—these tweaks will help you polish it even further.'
//   } else if (ratio >= 0.5) {
//     return 'Great start! You’ve got a solid foundation. With a few focused revisions, this essay can become even clearer and more convincing.'
//   } else {
//     return 'You’ve taken an important first step by getting your ideas down. With some structured revisions, you can turn this into a much stronger essay.'
//   }
// }

// // function getOverallImpression(result) {
// //   if (!result) return ''

// //   const ratio = result.overall_score / result.max_score
// //   if (ratio >= 0.75) {
// //     return 'Overall, this is a well-developed essay with a clear sense of purpose. Your ideas come across confidently, and there is already a strong foundation for a persuasive argument.'
// //   } else if (ratio >= 0.5) {
// //     return 'Overall, your essay shows genuine effort and a developing argument. There are clear ideas and moments of insight, even if the structure and support are not fully consistent yet.'
// //   } else {
// //     return 'Overall, your essay captures some important ideas, but they are not yet fully organized or supported. Treat this draft as a starting point that you can now shape into a clearer and more persuasive argument.'
// //   }
// // }

// // function getImprovementSummary(result) {
// //   if (!result) return ''

// //   const comments = result.criteria.map((c) => c.comment).join(' ')
// //   return `Here are the main areas to strengthen: ${comments}`
// // }

// // function getExampleNextSteps() {
// //   return (
// //     'For your next revision, you might start by rewriting the thesis as one clear, specific sentence that states your position and hints at your main reasons. ' +
// //     'Then, choose two or three key body paragraphs and add a concrete example, quote, or piece of data to each, followed by a short explanation of how that evidence supports your point. ' +
// //     'Finally, add or refine topic sentences and closing sentences so each paragraph clearly connects back to the thesis and helps the reader follow your argument from beginning to end.'
// //   )
// // }

// function EssayUploadSection({ selectedRubric }) {
//   const [essayText, setEssayText] = useState('')
//   const [uploadedFileName, setUploadedFileName] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [errorMessage, setErrorMessage] = useState('')
//   const [reviewResult, setReviewResult] = useState(null)
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
//     setEssayText(`Uploaded file: ${file.name}`)
//     setErrorMessage('')
//   }

//   const handleGoClick = async () => {
//     if (isSubmitting) return

//     // --- Validation ---
//     if (!selectedRubric) {
//       setErrorMessage('Please choose a rubric before starting.')
//       return
//     }

//     if (!essayText.trim() && !uploadedFileName) {
//       setErrorMessage('Please paste your essay or upload a file before starting.')
//       return
//     }

//     setErrorMessage('')
//     setIsSubmitting(true)
//     setReviewResult(null)

//     try {
//     // Map frontend IDs → backend rubric IDs
//       const backendRubricId =
//         selectedRubric.rubric_id ||
//         (selectedRubric.id === 'argumentative'
//           ? 'argumentative_essay_v1'
//           : selectedRubric.id) ||
//         'argumentative_essay_v1'

//       const payload = {
//         rubric_id: selectedRubric.rubric_id ?? 'argumentative_essay_v1',
//         essay_text: essayText || `Uploaded file: ${uploadedFileName}`,
//       }

//       const response = await fetch('http://localhost:8000/review', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       })

//       if (!response.ok) {
//         throw new Error(`Request failed with status ${response.status}`)
//       }

//       const data = await response.json()
//       setReviewResult(data)

//       // Smooth scroll to results
//       setTimeout(() => {
//         if (resultsRef.current) {
//           resultsRef.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start',
//           })
//         }
//       }, 150)
//     } catch (err) {
//       console.error(err)
//       setErrorMessage('Something went wrong while running the review. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Build a quick lookup for scores by criterion id
//   const criterionScores = {}
//   if (reviewResult?.criteria) {
//     reviewResult.criteria.forEach((c) => {
//       criterionScores[c.id] = c.score
//     })
//   }

//   const thesisScore = criterionScores['thesis_clarity']
//   const evidenceScore = criterionScores['evidence_support']
//   const organizationScore = criterionScores['organization_flow']

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

//             {/* Selected file name */}
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

//           {/* RIGHT SIDE: GO button + error */}
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

//       {/* Results section – visible only when reviewResult is set */}
//       {reviewResult && (
//         <section ref={resultsRef} className="results-section">
//           <div className="results-card">
//             <p className="results-heading">
//               {getMotivationalMessage(reviewResult)}
//             </p>

//             <h3 className="results-rubric-title">
//               {selectedRubric?.name ?? 'Argumentative Essay Rubric'}
//             </h3>

//             <p
//               style={{
//                 textAlign: 'center',
//                 marginBottom: '1rem',
//                 color: '#4b5563',
//               }}
//             >
//               Overall score: <strong>{reviewResult.overall_score}</strong> /{' '}
//               {reviewResult.max_score}
//             </p>

//             <div className="results-table-wrapper">
//               <table className="rubric-table results-table">
//                 <thead>
//                   <tr>
//                     <th>Criterion</th>
//                     <th>Excellent (4)</th>
//                     <th>Proficient (3)</th>
//                     <th>Developing (2)</th>
//                     <th>Beginning (1–0)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Thesis Clarity row */}
//                   <tr>
//                     <td className="rubric-criterion-cell">Thesis Clarity</td>
//                     <td
//                       className={
//                         thesisScore === 4 ? 'rubric-score-highlight' : ''
//                       }
//                     >
//                       4 – Clear, focused thesis stated early and maintained
//                       throughout.
//                     </td>
//                     <td
//                       className={
//                         thesisScore === 3 ? 'rubric-score-highlight' : ''
//                       }
//                     >
//                       3 – Thesis is understandable but could be more specific.
//                     </td>
//                     <td
//                       className={
//                         thesisScore === 2 ? 'rubric-score-highlight' : ''
//                       }
//                     >
//                       2 – Thesis is vague, overly broad, or general.
//                     </td>
//                     <td
//                       className={
//                         thesisScore !== undefined && thesisScore <= 1
//                           ? 'rubric-score-highlight'
//                           : ''
//                       }
//                     >
//                       1–0 – No clear thesis identifiable.
//                     </td>
//                   </tr>

//                   {/* Evidence & Support row */}
//                   <tr>
//                     <td className="rubric-criterion-cell">
//                       Evidence &amp; Support
//                     </td>
//                     <td
//                       className={
//                         evidenceScore === 4 ? 'rubric-score-highlight' : ''
//                       }
//                     >
//                       4 – Strong, relevant evidence with credible sources and
//                       clear explanations.
//                     </td>
//                     <td
//                       className={
//                         evidenceScore === 3 ? 'rubric-score-highlight' : ''
//                       }
//                     >
//                       3 – Adequate evidence with some explanation and mostly
//                       relevant sources.
//                     </td>
//                     <td
//                       className={
//                         evidenceScore === 2 ? 'rubric-score-highlight' : ''
//                       }
//                     >
//                       2 – Limited or partially relevant evidence; links to
//                       claims are unclear.
//                     </td>
//                     <td
//                       className={
//                         evidenceScore !== undefined && evidenceScore <= 1
//                           ? 'rubric-score-highlight'
//                           : ''
//                       }
//                     >
//                       1–0 – Claims are unsupported or based mostly on opinion.
//                     </td>
//                   </tr>

//                   {/* Organization & Flow row */}
//                   <tr>
//                     <td className="rubric-criterion-cell">
//                       Organization &amp; Flow
//                     </td>
//                     <td
//                       className={
//                         organizationScore === 4 ? 'rubric-score-highlight' : ''
//                       }
//                     >
//                       4 – Ideas flow logically with smooth transitions between
//                       paragraphs.
//                     </td>
//                     <td
//                       className={
//                         organizationScore === 3 ? 'rubric-score-highlight' : ''
//                       }
//                     >
//                       3 – Mostly logical structure; a few rough transitions.
//                     </td>
//                     <td
//                       className={
//                         organizationScore === 2 ? 'rubric-score-highlight' : ''
//                       }
//                     >
//                       2 – Some disorganized sections; ideas may feel jumpy.
//                     </td>
//                     <td
//                       className={
//                         organizationScore !== undefined &&
//                         organizationScore <= 1
//                           ? 'rubric-score-highlight'
//                           : ''
//                       }
//                     >
//                       1–0 – Lacks clear structure; difficult for the reader to
//                       follow.
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* Three-paragraph feedback block */}
//             <div className="results-advice-block">
//               <p className="results-advice">
//                 <strong>Overall impression:</strong> {reviewResult.overall_impression}
//               </p>
//               <p className="results-advice">
//                 <strong>Key areas to strengthen:</strong> {reviewResult.improvement_summary}
//               </p>
//               <p className="results-advice">
//                 <strong>Example next steps:</strong> {reviewResult.next_steps_example}
//               </p>
//             </div>

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
    return 'Great work! Your essay is already strong—these tweaks will help you polish it even further.'
  } else if (ratio >= 0.5) {
    return 'Great start! You’ve got a solid foundation. With a few focused revisions, this essay can become even clearer and more convincing.'
  } else {
    return 'You’ve taken an important first step by getting your ideas down. With some structured revisions, you can turn this into a much stronger essay.'
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
        // Uses backend rubric_id from RubricsSection
        rubric_id: selectedRubric.rubric_id ?? 'argumentative_essay_v1',
        essay_text: essayText || `Uploaded file: ${uploadedFileName}`,
      }

      const response = await fetch('http://localhost:8000/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  // --- Build quick lookup maps from the LLM result ---
  const criterionScores = {}
  const criterionComments = {}

  if (reviewResult?.criteria) {
    reviewResult.criteria.forEach((c) => {
      criterionScores[c.id] = c.score
      criterionComments[c.id] = c.comment
    })
  }

  // Convenience alias
  const tableRows = selectedRubric?.tableRows || []

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

            <p
              style={{
                textAlign: 'center',
                marginBottom: '1rem',
                color: '#4b5563',
              }}
            >
              Overall score: <strong>{reviewResult.overall_score}</strong> /{' '}
              {reviewResult.max_score}
            </p>

            {/* Results table driven by selectedRubric.tableRows */}
            <div className="results-table-wrapper">
              <table className="rubric-table results-table">
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
                  {tableRows.map((row) => {
                    // row.id must match the rubric criterion id used in the backend
                    const score = criterionScores[row.id]

                    return (
                      <tr key={row.id || row.criterion}>
                        <td className="rubric-criterion-cell">
                          {row.criterion}
                        </td>

                        {/* Excellent (4) */}
                        <td
                          className={
                            score === 4 ? 'rubric-score-highlight' : ''
                          }
                        >
                          {row.excellent}
                        </td>

                        {/* Proficient (3) */}
                        <td
                          className={
                            score === 3 ? 'rubric-score-highlight' : ''
                          }
                        >
                          {row.proficient}
                        </td>

                        {/* Developing (2) */}
                        <td
                          className={
                            score === 2 ? 'rubric-score-highlight' : ''
                          }
                        >
                          {row.developing}
                        </td>

                        {/* Beginning (1–0) */}
                        <td
                          className={
                            score === undefined || score <= 1
                              ? 'rubric-score-highlight'
                              : ''
                          }
                        >
                          {row.beginning}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Three-paragraph feedback block */}
            <div className="results-advice-block">
              <p className="results-advice">
                <strong>Overall impression:</strong>{' '}
                {reviewResult.overall_impression}
              </p>
              <p className="results-advice">
                <strong>Key areas to strengthen:</strong>{' '}
                {reviewResult.improvement_summary}
              </p>
              <p className="results-advice">
                <strong>Example next steps:</strong>{' '}
                {reviewResult.next_steps_example}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default EssayUploadSection
