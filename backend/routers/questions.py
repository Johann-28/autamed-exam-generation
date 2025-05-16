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
                        question_types : str = Form(...),
                        key_topics : str = Form(...)):
    llmClient = LLMClient()
    
    return llmClient.generate_questions(files , question_types, key_topics)  
 
@router.post("/get_docs_topics")
async def get_questions(files: List[UploadFile] = File(...)):
    llmClient = LLMClient()
    return llmClient.get_docs_topics(files)   

