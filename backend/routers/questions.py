from fastapi import APIRouter, UploadFile, File
from services.llm_client import LLMClient
from typing import List

router = APIRouter(
    prefix="/questions",
    tags=["questions"],
    responses={404: {"description": "Not found"}},
)

@router.post("/")
async def get_questions(files: List[UploadFile] = File(...)):
    llmClient = LLMClient()
    return llmClient.generate_questions(files)
