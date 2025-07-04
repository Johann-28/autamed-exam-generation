from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.middleware import setup_middleware
from routers import questions
from routers import health


app = FastAPI()

setup_middleware(app)

app.include_router(questions.router)
app.include_router(health.router)
