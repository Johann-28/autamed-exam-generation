from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from decimal import Decimal

class AnswerCreate(BaseModel):
    answer_text: str
    is_correct: bool = False
    answer_order: Optional[int] = None

class AnswerResponse(BaseModel):
    id: int
    answer_text: str
    is_correct: bool
    answer_order: Optional[int]
    
    class Config:
        from_attributes = True

class QuestionCreate(BaseModel):
    question_text: str
    question_type: str = "multiple_choice"
    question_order: Optional[int] = None
    score: Decimal = Decimal("1.0")
    answers: List[AnswerCreate]

class QuestionResponse(BaseModel):
    id: int
    question_text: str
    question_type: str
    question_order: Optional[int]
    score: Decimal
    answers: List[AnswerResponse]
    
    class Config:
        from_attributes = True

class ExamCreate(BaseModel):
    name: str
    google_forms_url: Optional[str] = None
    questions: List[QuestionCreate]

class ExamResponse(BaseModel):
    id: int
    name: str
    google_forms_url: Optional[str]
    created_at: datetime
    is_active: bool
    questions: List[QuestionResponse]
    
    class Config:
        from_attributes = True

class ExamUpdate(BaseModel):
    name: Optional[str] = None
    google_forms_url: Optional[str] = None
    is_active: Optional[bool] = None