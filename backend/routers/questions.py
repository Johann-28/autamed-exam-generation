from fastapi import APIRouter, UploadFile, File, Form, Body
from services.llm_client import LLMClient
from .forms import GoogleFormsQuizManager
from models.exam import Exam
from typing import List
from services.document_extractor import DocumentExtractor

router = APIRouter(
    prefix="/questions",
    tags=["questions"],
    responses={404: {"description": "Not found"}},
)

@router.post("/")
async def get_questions(files: List[UploadFile] = File(...),
                        question_types : str = Form(...),
                        key_topics : str = Form(...),):
    llmClient = LLMClient()
    return llmClient.generate_questions(files , question_types, key_topics)   

@router.post("/create-google-form")
async def create_google_form(exam : Exam):
    APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz9vCvcMSvT8KuKiWPUZy0kkcatRc2ETfXunVpHVVsTULwc3LdBVB7z4iQt1Quyw4BF/exec"
    manager = GoogleFormsQuizManager(APPS_SCRIPT_URL)
    result = manager.run_sample(exam.questions, exam.titleform)
    return {"message": "Form created", "result": result}

@router.post("/get_docs_topics")
async def get_questions(files: List[UploadFile] = File(...),
                        webUrl: str = Form(...)):
    llmClient = LLMClient()
    return llmClient.get_docs_topics(files)   

@router.get("/get_url")
async def get_url(url: str = Body(...)):
    return DocumentExtractor.extract_text_from_webpage(url)

@router.post("/process_image")
async def process_image(file: List[UploadFile] = File(...)):
    llmClient = LLMClient()
    return llmClient.processImage(file)

