from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import ReviewRequest, ReviewResponse
from .dummy_data import make_dummy_review

app = FastAPI(
  title="Rubric-EFFECT API",
  version="0.1.0",
)

# CORS so your React app can call the API
origins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.post("/review", response_model=ReviewResponse)
async def review_essay(payload: ReviewRequest) -> ReviewResponse:
  """
  Dummy rubric-based review endpoint.
  For now this just returns static data.
  """
  return make_dummy_review(payload)
