import json
from typing import List
from models.question_type import QuestionType
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