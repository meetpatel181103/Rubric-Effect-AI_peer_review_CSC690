from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_health import router as health_router
from app.api.routes_upload import router as upload_router
from app.api.routes_score import router as score_router

app = FastAPI(title="AI Peer Review Backend", version="0.1.0")

# CORS (adjust for your frontend origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(upload_router, prefix="/api")
app.include_router(score_router, prefix="/api")

@app.get("/")
def root():
    return {"ok": True, "service": "ai-peer-review-backend"}
