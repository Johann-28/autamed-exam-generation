from fastapi import APIRouter, UploadFile, File, Form
from services.llm_client import LLMClient
from .forms import GoogleFormsQuizManager
from models.question import Question
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

@router.post("/create-google-form")
async def create_google_form(questions : List[Question]):
    APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz9vCvcMSvT8KuKiWPUZy0kkcatRc2ETfXunVpHVVsTULwc3LdBVB7z4iQt1Quyw4BF/exec"
    manager = GoogleFormsQuizManager(APPS_SCRIPT_URL)
    # Puedes usar run_sample() o un método personalizado
    result = manager.run_sample(questions)
    return {"message": "Form created", "result": result}

