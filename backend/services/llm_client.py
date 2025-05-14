from models.question import Question
from dotenv import load_dotenv
from google import genai
from backend.utils.text_utils import TextUtils
from models.question_type import QuestionType
from utils.parsing_utils import ParsingUtils
from typing import List
from fastapi import UploadFile
import os

class LLMClient:
    def __init__(self):
        """Initialize the generator by loading environment variables and setting up the client."""
        load_dotenv()
        self.genai_api_key = os.getenv("GENAI_API_KEY")
        self.llm = os.getenv("LLM")
        self.client = genai.Client(api_key=self.genai_api_key)

    def _generate_prompt(self, text: str, question_types: List[QuestionType]) -> str:
        question_types_instructions = "\n".join(
            [
            f"- {q.total} question(s) of type {q.type} "
            + ", ".join(
                f"{level.capitalize()}: {count}"
                for level, count in [("easy", q.easy), ("medium", q.medium), ("hard", q.hard)]
                if count > 0
            )
            for q in question_types
            ]
        )

        return f"""
            Generate questions for a quiz based on the topic of Python programming.
            Consider all the information in the text below.
            Generate in JSON format.
            The questions should be of the following types:
            {question_types_instructions}
            Consider the following docs:
            {text}
        """

    def _count_tokens(self, model: str, content: str):
        return self.client.models.count_tokens(model=model, contents=content)

    def generate_questions(self, files: List[UploadFile] , question_types_list : str) -> list[Question]:

        # Parse the question types from the input string
        question_types = ParsingUtils.parse_question_types(question_types_list)

        text = TextUtils.combine_text_from_files(files)

        # Generate the prompt
        prompt = self._generate_prompt(text , question_types)

        # Generate content using the LLM
        response = self.client.models.generate_content(
            model=self.llm,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_schema": list[Question]
            },
        )

        # Log token usage
        print("Tokens in prompt:", self._count_tokens(model=self.llm, content=prompt))
        print("Tokens in response:", self._count_tokens(model=self.llm, content=response))

        # Parse and return the questions
        questions: list[Question] = response.parsed
        return questions