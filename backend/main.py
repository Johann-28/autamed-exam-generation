from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.middleware import setup_middleware
from routers import questions
from routers import health



# Configure FastAPI with custom documentation
app = FastAPI(
    title="Exam Generation API",
    description="""
    🎯 **API for Automatic Exam Generation**
    
    This API allows you to:
    * 📄 Process documents (PDF, PowerPoint, images)
    * 🤖 Generate questions using AI (Google Gemini)
    * 📝 Automatically create Google Forms
    * 💾 Save exams in a PostgreSQL database
    * 🔍 Manage existing exams
    
    ## Workflow:
    1. **Upload documents** → `/questions/` 
    2. **Generate questions** → Processed with AI
    3. **Create Google Form** → `/questions/create-google-form`
    4. **Save to DB** → `/questions/save_exam`
    """,
    version="1.0.0",
    contact={
        "name": "Your Name",
        "email": "your-email@example.com",
        "url": "https://github.com/your-username/exam-generation",
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
    openapi_tags=[
        {
            "name": "questions",
            "description": "📚 Operations related to questions and exams",
        },
        {
            "name": "health",
            "description": "❤️ Application health check",
        },
    ]
)
setup_middleware(app)

app.include_router(questions.router)
app.include_router(health.router)
