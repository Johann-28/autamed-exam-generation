from extractor import extract_text_from_pdf
from models.question import Question
from dotenv import load_dotenv #Load environment variables from .env file
from google import genai
from utils import combine_text_from_files
import os

load_dotenv()

def get_exam_questions(files):
    genai_api_key = os.getenv("GENAI_API_KEY")
    llm = os.getenv("LLM")

    text = combine_text_from_files(files)


    client = genai.Client(api_key=genai_api_key)
    prompt = f"""
    Generate 6 questions with different answers and only 1 correct answer for a quiz on the topic of Python programming.
    Consider all the information in the text below.
    Generate in JSON format.
    The questions should be of the following types:
    - 3 questions of type Multiple Choice (One correct)
    - 3 question of type True or False
    Consider the following docs:
    {text}
    """
    response = client.models.generate_content(
        model=llm,
        contents= prompt , \
        config={
            "response_mime_type": "application/json",
            "response_schema": list[Question],
        },
    )

    print('Tokens prompt',client.models.count_tokens(model=llm,contents= prompt))
    print('Tokens prompt',client.models.count_tokens(model=llm,contents= response))

        # Use the response as a JSON string.
        # Use instantiated objects.
    questions: list[Question] = response.parsed
    return questions
