from io import BytesIO
from pathlib import Path

import pdfplumber
import docx  # from python-docx


MAX_CHARS = 20000  # safety cap so we don't send massive texts back to frontend


class UnsupportedFileTypeError(Exception):
  pass


def _normalize_whitespace(text: str) -> str:
  # Collapse weird whitespace a bit; keep line breaks
  return "\n".join(
      line.strip()
      for line in text.splitlines()
      if line.strip()
  )


def extract_text_from_txt(data: bytes) -> str:
  text = data.decode("utf-8", errors="ignore")
  return _normalize_whitespace(text)


def extract_text_from_pdf(data: bytes) -> str:
  text_chunks: list[str] = []
  with pdfplumber.open(BytesIO(data)) as pdf:
    for page in pdf.pages:
      page_text = page.extract_text() or ""
      text_chunks.append(page_text)
  text = "\n\n".join(text_chunks)
  return _normalize_whitespace(text)


def extract_text_from_docx(data: bytes) -> str:
  doc = docx.Document(BytesIO(data))
  paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
  text = "\n\n".join(paragraphs)
  return _normalize_whitespace(text)


def extract_text_from_file(filename: str, data: bytes) -> str:
  """
  Dispatch helper: choose parser based on file extension.
  Supported: .txt, .pdf, .docx
  """
  ext = Path(filename).suffix.lower()

  if ext == ".txt":
    text = extract_text_from_txt(data)
  elif ext == ".pdf":
    text = extract_text_from_pdf(data)
  elif ext == ".docx":
    text = extract_text_from_docx(data)
  else:
    raise UnsupportedFileTypeError(
        f"Unsupported file type: {ext}. Please upload a .pdf, .docx, or .txt file."
    )

  # Safety cap
  if len(text) > MAX_CHARS:
    text = text[:MAX_CHARS]

  return text
