from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.parser_service import extract_text_from_upload

router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("")
async def upload_file(file: UploadFile = File(...)):
    if file.content_type not in {"application/pdf", "text/plain", 
                                 "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    text = await extract_text_from_upload(file)
    return {"filename": file.filename, "chars": len(text), "preview": text[:1000]}
