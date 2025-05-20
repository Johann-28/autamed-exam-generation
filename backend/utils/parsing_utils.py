import json
from typing import List
from models.question_type import QuestionType
from models.question import Question
from pydantic import ValidationError

class ParsingUtils:

    """
    Parses a JSON string representing a list of question types and converts it into a list of `QuestionType` objects.
    """
    @staticmethod
    def parse_question_types(question_types_list: str) -> List[QuestionType]:
        try:
            data = json.loads(question_types_list)
            return [QuestionType(**item) for item in data]
        except (json.JSONDecodeError, ValidationError) as e:
            raise ValueError(f"Error parsing question types: {e}")
        
    
    @staticmethod
    def convert_questions_for_google_forms(questions: List[Question]) -> List[dict]:
        result = []
        for q in questions:
            new_q = {
                "title": q.question,
                "points": q.points,
                "feedback": {
                    "correct": "Correct!",
                    "incorrect": "Incorrect answer."
                }
            }
            # Tipo y opciones
            if q.type == 1:
                new_q["type"] = "MULTIPLE_CHOICE"
                new_q["options"] = [a.text for a in q.answers]
                # Primer respuesta correcta
                new_q["correctAnswer"] = next((a.text for a in q.answers if a.is_correct), None)
            elif q.type == 2:
                new_q["type"] = "CHECKBOX"
                new_q["options"] = [a.text for a in q.answers]
                new_q["correctAnswers"] = [a.text for a in q.answers if a.is_correct]
            elif q.type == 3:
                new_q["type"] = "TEXT"
                new_q["correctAnswer"] = next((a.text for a in q.answers if a.is_correct), None)
                new_q["feedback"]["general"] = "Thanks for your answer."
            result.append(new_q)
        return result
    
    @staticmethod
    def parse_key_topics(key_topics_list: str) -> List[str]:
        try:
            data = json.loads(key_topics_list)
            if not isinstance(data, list) or not all(isinstance(item, str) for item in data):
                raise ValueError("Key topics should be a list of strings.")
            return data
        except (json.JSONDecodeError, ValueError) as e:
            raise ValueError(f"Error parsing key topics: {e}")

