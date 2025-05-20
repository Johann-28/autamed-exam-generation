from pydantic import BaseModel

class Question(BaseModel):
    question: str
    type: int
    points: int
    class Answer(BaseModel):
        text: str
        is_correct: bool
    answers: list[Answer]