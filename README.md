
# 🎯 Automated Exam Generation System

An intelligent system that automatically generates exams from documents using AI, creates Google Forms, and manages exam data with a modern web interface.

![Project Banner](https://img.shields.io/badge/Angular-19-red) ![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green) ![Docker](https://img.shields.io/badge/Docker-Ready-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Docker Deployment](#docker-deployment)
- [Environment Configuration](#environment-configuration)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## 🚀 Overview

This project automates the creation of educational exams by processing documents (PDFs, PowerPoint presentations, images) and generating contextual questions using Google's Gemini AI. The system then creates Google Forms automatically and stores exam data in a PostgreSQL database.

### Key Workflow:
1. **📄 Upload Documents** → PDF, PPTX, or images
2. **🤖 AI Processing** → Extract topics and generate questions using Gemini AI
3. **⚙️ Configuration** → Set question types and difficulty levels
4. **📝 Form Creation** → Automatic Google Forms generation
5. **💾 Data Storage** → Save exams in PostgreSQL database
6. **📊 Management** → View and manage all created exams

## ✨ Features

### 🎯 Core Features
- **Multi-format Document Processing**: PDF, PowerPoint, and image support
- **AI-Powered Question Generation**: Uses Google Gemini 2.0 Flash for intelligent question creation
- **Flexible Question Types**: Multiple choice, checkbox, and text questions
- **Difficulty Levels**: Easy, medium, and hard question categorization
- **Topic Extraction**: Automatic identification of key topics from documents
- **Google Forms Integration**: Seamless form creation with quiz settings
- **Exam Management**: Complete CRUD operations for exams
- **PDF Export**: Download questions as PDF documents

### 🔧 Technical Features
- **Modern UI**: Angular 19 frontend with PrimeNG components
- **RESTful API**: FastAPI backend with comprehensive documentation
- **Database Management**: PostgreSQL with SQLAlchemy ORM
- **Containerization**: Docker support for easy deployment
- **Cloud Integration**: Google APIs for form creation
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Tech Stack

### Frontend
- **Angular 19** - Modern web framework
- **PrimeNG 19** - Rich UI component library
- **TailwindCSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming

### Backend
- **FastAPI 0.115** - High-performance Python web framework
- **SQLAlchemy 2.0** - SQL toolkit and ORM
- **PostgreSQL 15** - Advanced relational database
- **Google Gemini AI** - AI-powered question generation
- **Google APIs** - Forms and Drive integration
- **Pydantic** - Data validation and serialization

### DevOps & Tools
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline
- **Uvicorn** - ASGI server for FastAPI

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Python** (v3.11 or higher)
- **Docker** and **Docker Compose**
- **PostgreSQL** (if running locally)

### API Keys Required:
- **Google Gemini API Key** - For AI question generation
- **Google Cloud Console Credentials** - For Google Forms API

## 🚀 Installation

### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/Johann-28/autamed-exam-generation.git
cd exam-generation
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your API keys and database credentials
```

3. **Run with Docker Compose**
```bash
docker-compose up --build
```

### Option 2: Local Development

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend Setup
```bash
cd frontend/exam-generation-app
npm install
ng serve
```

#### Database Setup
```bash
# Using Docker for PostgreSQL
docker run --name postgres-exam \
  -e POSTGRES_USER=testuser \
  -e POSTGRES_PASSWORD=12345678 \
  -e POSTGRES_DB=exam_generation_db \
  -p 5432:5432 -d postgres:15
```

## 📖 Usage

### 1. Access the Application
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432

### 2. Create an Exam

#### Step 1: Upload Documents
- Drag and drop PDF files, PowerPoint presentations, or images
- Or paste a URL to extract content from web pages
- Supported formats: `.pdf`, `.pptx`, `.ppt`, images

#### Step 2: Configure Question Types
- Select question types: Multiple Choice, Checkbox, Text
- Set difficulty levels (Easy, Medium, Hard) and quantities
- Configure points per question

#### Step 3: Select Topics
- AI automatically extracts key topics from documents
- Select up to 3 topics to focus on
- Generate questions based on selected topics

#### Step 4: Review and Export
- Review generated questions in a responsive layout
- Add exam title
- Export to Google Forms automatically
- Save exam to database
- Download PDF version of questions

### 3. Manage Exams
- View all created exams in the dashboard
- Check exam statistics (total exams, active exams, total questions)
- View detailed exam information
- Create Google Forms from existing exams
- Delete unwanted exams

## 📚 API Documentation

### Key Endpoints

#### Question Generation
```http
POST /questions/
Content-Type: multipart/form-data

files: [file1.pdf, file2.pptx]
question_types: JSON string
key_topics: JSON string
```

#### Topic Extraction
```http
POST /questions/get_docs_topics
Content-Type: multipart/form-data

files: [document files]
webUrl: string (optional)
```

#### Google Forms Creation
```http
POST /questions/create-google-form
Content-Type: application/json

{
  "titleform": "Exam Title",
  "questions": [...],
  "formUrl": null
}
```

#### Exam Management
```http
GET /questions/exams          # Get all exams
GET /questions/exams/{id}     # Get specific exam
POST /questions/save_exam     # Save new exam
PUT /questions/exams/{id}     # Update exam
DELETE /questions/exams/{id}  # Delete exam
```

## 📁 Project Structure

```
exam-generation/
├── 📂 frontend/exam-generation-app/
│   ├── 📂 src/app/
│   │   ├── 📂 components/
│   │   │   ├── upload-zone/           # File upload component
│   │   │   ├── question-type-config/  # Question configuration
│   │   │   ├── docs-topics/           # Topic selection
│   │   │   ├── question-list/         # Question display
│   │   │   ├── export-exam-dialog/    # Export functionality
│   │   │   └── exams-list/           # Exam management
│   │   ├── 📂 models/                # TypeScript models
│   │   ├── 📂 shared/                # Shared services
│   │   └── 📂 services/              # HTTP services
│   ├── 📄 package.json
│   ├── 📄 angular.json
│   └── 📄 Dockerfile
├── 📂 backend/
│   ├── 📂 core/                      # App configuration
│   ├── 📂 database/                  # Database models and connection
│   ├── 📂 models/                    # Pydantic models
│   ├── 📂 routers/                   # API endpoints
│   ├── 📂 services/                  # Business logic
│   ├── 📂 utils/                     # Utility functions
│   ├── 📄 main.py                    # FastAPI app entry point
│   ├── 📄 requirements.txt
│   └── 📄 Dockerfile
├── 📄 docker-compose.yaml
├── 📄 docker-compose.dev.yaml
├── 📄 .env.example
└── 📄 README.md
```

## 🐳 Docker Deployment

### Environment Variables
Create a .env file with:

```env
# AI Configuration
GENAI_API_KEY=your-gemini-api-key
LLM=gemini-2.0-flash

# Database Configuration (for Docker)
DATABASE_URL=postgresql://testuser:your-password@postgres:5432/exam_generation_db
DB_HOST=postgres
DB_PORT=5432
DB_NAME=exam_generation_db
DB_USER=testuser
DB_PASSWORD=your-secure-password
```

### Production Deployment
```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Scale backend service
docker-compose up --scale backend=2

# Stop services
docker-compose down
```

### Development Mode
```bash
# Run with development overrides
docker-compose -f docker-compose.dev.yaml up
```

## 🔧 Environment Configuration

### Google API Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project

2. **Enable APIs**
   - Enable Google Forms API
   - Enable Google Drive API

3. **Create Credentials**
   - Create OAuth 2.0 credentials
   - Download credentials JSON file
   - Place in credentials2.json

4. **Get Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Generate API key
   - Add to .env file

### Database Schema

The application uses PostgreSQL with the following schema:

```sql
-- Exam Table
CREATE TABLE exam (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    google_forms_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Question Table
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER REFERENCES exam(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'multiple_choice',
    question_order INTEGER,
    score DECIMAL(5,2) DEFAULT 1.0
);

-- Answer Table
CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES question(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    answer_order INTEGER
);
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend/exam-generation-app
npm test
```

### API Testing
- Use the interactive API docs at http://localhost:8000/docs
- Test endpoints with curl or Postman

## 🐛 Troubleshooting

### Common Issues

1. **Docker Build Fails**
   ```bash
   # Clear Docker cache
   docker system prune -a
   docker-compose build --no-cache
   ```

2. **Database Connection Issues**
   ```bash
   # Check PostgreSQL status
   docker-compose logs postgres
   
   # Reset database
   docker-compose down -v
   docker-compose up postgres
   ```

3. **API Key Issues**
   ```bash
   # Verify environment variables
   docker-compose exec backend env | grep API
   ```

4. **Frontend Build Issues**
   ```bash
   # Clear node modules
   cd frontend/exam-generation-app
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **Google Forms Creation Fails**
   - Verify OAuth credentials are properly configured
   - Check if Google Forms API is enabled
   - Ensure token.json has valid permissions

## 📈 Performance

- **Question Generation**: ~3-5 seconds per document
- **Database Operations**: <100ms for CRUD operations
- **Form Creation**: ~2-3 seconds via Google APIs
- **File Processing**: Supports files up to 15MB
- **Concurrent Users**: Designed for multiple simultaneous users

## 🔐 Security

- Environment variables for sensitive data
- CORS protection for API endpoints
- SQL injection protection via SQLAlchemy ORM
- Input validation with Pydantic models
- OAuth 2.0 for Google API authentication
- File type validation for uploads

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use Angular style guide for TypeScript
- Write tests for new features
- Update documentation as needed
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 👥 Authors

- **Johan Velazquez** - **Initial work** - [GitHub Profile](https://github.com/Johann-28)
- **Darly Juarez** - **Initial work** - [GitHub Profile](https://github.com/Darly2305)


## 🙏 Acknowledgments

- Google Gemini AI for powerful question generation
- PrimeNG team for excellent UI components
- FastAPI community for the amazing framework
- Angular team for the robust frontend framework
- PostgreSQL team for the reliable database system

## 📞 Support

For support, email kingdrower11@gmail.com or create an issue on GitHub.

## 🗺️ Roadmap

- [ ] Add support for more document formats (Word, Excel)
- [ ] Implement question difficulty analysis
- [ ] Add multi-language support
- [ ] Create mobile application
- [ ] Add real-time collaboration features
- [ ] Implement advanced analytics dashboard

---

⭐ **Star this repository if you found it helpful!**

**Made with ❤️ using Angular, FastAPI, and Google Gemini AI**

</details>

