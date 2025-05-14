from pydantic import BaseModel
class QuestionType(BaseModel):
    type: str
    easy: int
    medium: int
    hard: int
    total: int