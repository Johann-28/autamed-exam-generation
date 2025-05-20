from models.question import Question
from dotenv import load_dotenv
from google import genai
from backend.utils.text_utils import TextUtils
from models.question_type import QuestionType
from models.key_topics import KeyTopics
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

    def _generate_prompt(self, text: str, question_types: List[QuestionType], key_topics : List[str]) -> str:
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

        number_of_questions = sum(
            q.easy + q.medium + q.hard for q in question_types
        )

        key_topics_instructions = "\n".join(
            [f"- {topic}" for topic in key_topics]
        )

        return f"""
            Generate {number_of_questions} questions for a quiz based on the topic of Python programming.
            Consider all the information in the text below.
            Generate in JSON format.
            The questions should be of the following types:
            {question_types_instructions}
            If Multiple Choise, provide 1 as a type.
            If CheckBox, provide 2 as a type.
            If Text, provide 3 as a type.
            Focus on the following key topics:
            {key_topics_instructions}
            Consider the following docs:
            {text}
        """

    def _count_tokens(self, model: str, content: str):
        return self.client.models.count_tokens(model=model, contents=content)

    def generate_questions(self, files: List[UploadFile] , question_types_list : str, key_topics_list) -> list[Question]:

        # Parse the question types from the input string
        question_types = ParsingUtils.parse_question_types(question_types_list)

        # Parse the key topics from the input string
        key_topics = ParsingUtils.parse_key_topics(key_topics_list)

        text = TextUtils.combine_text_from_files(files)

        # Generate the prompt
        prompt = self._generate_prompt(text , question_types, key_topics)

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
    
    def get_docs_topics(self, files: List[UploadFile]) -> str:
        """Get the topics of the documents."""
        text = TextUtils.combine_text_from_files(files)
        prompt = f"""
            Identify and list exactly 5 main topics covered in the following text. 
            Return only the topics as a JSON array of strings.
            Text:
            {text}
        """
        models = self.client.models.list()
        response = self.client.models.generate_content(
            model=self.llm,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_schema": list[KeyTopics]
            },
        )

        topics = response.parsed
        return topics