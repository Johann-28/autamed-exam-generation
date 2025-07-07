from fastapi import APIRouter, UploadFile, File, Form, Body, Depends, HTTPException
from sqlalchemy.orm import Session
from services.llm_client import LLMClient
from services.exam_service import ExamService
from .forms import GoogleFormsQuizManager
from models.exam import Exam
from models.database_models import ExamCreate, ExamResponse, ExamUpdate
from database.connection import get_db
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

@router.post("/save_exam", response_model=ExamResponse)
async def save_exam(exam: Exam, db: Session = Depends(get_db)):
    """Save an exam to the database."""
    try:
        # Create the exam using the service
        db_exam = ExamService.create_exam_from_questions(
            db=db,
            name=exam.titleform,
            questions=exam.questions,
            google_forms_url=exam.formUrl
            
        )
        return db_exam
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving exam: {str(e)}")

@router.get("/exams", response_model=List[ExamResponse])
async def get_exams(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all exams."""
    exams = ExamService.get_all_exams(db, skip=skip, limit=limit)
    return exams

@router.get("/exams/{exam_id}", response_model=ExamResponse)
async def get_exam(exam_id: int, db: Session = Depends(get_db)):
    """Get an exam by ID."""
    exam = ExamService.get_exam_by_id(db, exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam

@router.put("/exams/{exam_id}", response_model=ExamResponse)
async def update_exam(exam_id: int, exam_update: ExamUpdate, db: Session = Depends(get_db)):
    """Update an exam."""
    exam = ExamService.update_exam(db, exam_id, exam_update)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam

@router.delete("/exams/{exam_id}")
async def delete_exam(exam_id: int, db: Session = Depends(get_db)):
    """Delete an exam."""
    success = ExamService.delete_exam(db, exam_id)
    if not success:
        raise HTTPException(status_code=404, detail="Exam not found")
    return {"message": "Exam deleted successfully"}

@router.post("/get_docs_topics")
async def get_docs_topics(files: List[UploadFile] = File(...),
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