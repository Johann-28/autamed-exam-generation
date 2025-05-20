from pydantic import BaseModel

class Question(BaseModel):
    question: str
    type: str
    points: int
    class Answer(BaseModel):
        text: str
        is_correct: bool
    answers: list[Answer]