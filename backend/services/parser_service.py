import io
from fastapi import UploadFile
from PyPDF2 import PdfReader
import pdfplumber
from docx import Document

async def extract_text_from_upload(file: UploadFile) -> str:
    content = await file.read()
    ext = (file.filename or "").lower()

    if ext.endswith(".pdf"):
        # Try pdfplumber first (more robust), fallback to PyPDF2
        try:
            with pdfplumber.open(io.BytesIO(content)) as pdf:
                return "\n".join(page.extract_text() or "" for page in pdf.pages)
        except Exception:
            reader = PdfReader(io.BytesIO(content))
            return "\n".join(page.extract_text() or "" for page in reader.pages)

    if ext.endswith(".docx"):
        doc = Document(io.BytesIO(content))
        return "\n".join(p.text for p in doc.paragraphs)

    # default: treat as plain text
    return content.decode(errors="ignore")
