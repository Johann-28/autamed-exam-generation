from pydantic import BaseModel
from.question import Question
from typing import List
class Exam(BaseModel):
    questions: List[Question]
    titleform: str
    formUrl: str = None
