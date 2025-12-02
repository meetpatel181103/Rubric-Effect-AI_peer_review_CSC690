import { useRef, useState } from 'react'

function EssayUploadSection() {
  const [essayText, setEssayText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

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

    // TODO: Replace this with your real API call.
    // When your backend response arrives, call setIsSubmitting(false).
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  return (
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
  )
}

export default EssayUploadSection
