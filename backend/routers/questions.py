from fastapi import APIRouter, UploadFile, File, Form
from services.llm_client import LLMClient
from typing import List

router = APIRouter(
    prefix="/questions",
    tags=["questions"],
    responses={404: {"description": "Not found"}},
)

@router.post("/")
async def get_questions(files: List[UploadFile] = File(...),
                        question_types : str = Form(...)):
    llmClient = LLMClient()
    return llmClient.generate_questions(files , question_types)   

@router.get("/create-google-form")
async def create_google_form():
    return {"message": "Google form created successfully."}
