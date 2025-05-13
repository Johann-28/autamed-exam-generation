#pip install -q -U google-genai langchain PyPDF2 python-dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from llm import get_exam_questions
from fastapi import UploadFile, File
from typing import List

app = FastAPI()	

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Permitir solicitudes desde Angular
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

@app.post("/questions")
async def get_questions(files: List[UploadFile] = File(...)):
    return get_exam_questions(files)

