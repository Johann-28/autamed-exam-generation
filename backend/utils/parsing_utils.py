import json
from typing import List
from models.question_type import QuestionType
from models.key_topics import KeyTopics
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
    def parse_key_topics(key_topics_list: str) -> List[str]:
        try:
            data = json.loads(key_topics_list)
            if not isinstance(data, list) or not all(isinstance(item, str) for item in data):
                raise ValueError("Key topics should be a list of strings.")
            return data
        except (json.JSONDecodeError, ValueError) as e:
            raise ValueError(f"Error parsing key topics: {e}")