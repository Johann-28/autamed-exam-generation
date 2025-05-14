from models.question import Question
from dotenv import load_dotenv
from google import genai
from backend.utils.text_utils import TextUtils
import os

class LLMClient:
    def __init__(self):
        """Initialize the generator by loading environment variables and setting up the client."""
        load_dotenv()
        self.genai_api_key = os.getenv("GENAI_API_KEY")
        self.llm = os.getenv("LLM")
        self.client = genai.Client(api_key=self.genai_api_key)

    def _generate_prompt(self, text: str) -> str:
        return f"""
        Generate 3 questions with different answers and only 1 correct answer for a quiz on the topic of Python programming.
        Consider all the information in the text below.
        Generate in JSON format.
        The questions should be of the following types:
        - 1 question of type Multiple Choice (One correct)
        - 1 question of type Multiple Choice (Multiple correct)
        - 1 question of type True or False
        Consider the following docs:
        {text}
        """

    def _count_tokens(self, model: str, content: str):
        return self.client.models.count_tokens(model=model, contents=content)

    def generate_questions(self, files: list) -> list[Question]:
        # Combine text from files
        text = TextUtils.combine_text_from_files(files)

        # Generate the prompt
        prompt = self._generate_prompt(text)

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