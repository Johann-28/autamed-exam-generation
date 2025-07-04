from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database.connection import Base

class ExamDB(Base):
    __tablename__ = "exam"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    google_forms_url = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.current_timestamp())
    is_active = Column(Boolean, default=True)

    # Relationship with questions
    questions = relationship("QuestionDB", back_populates="exam", cascade="all, delete-orphan")

class QuestionDB(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True, index=True)
    exam_id = Column(Integer, ForeignKey("exam.id"), nullable=False)
    question_text = Column(Text, nullable=False)
    question_type = Column(String(50), default="multiple_choice")
    question_order = Column(Integer, nullable=True)
    score = Column(DECIMAL(5, 2), default=1.0)

    # Relationships
    exam = relationship("ExamDB", back_populates="questions")
    answers = relationship("AnswerDB", back_populates="question", cascade="all, delete-orphan")

class AnswerDB(Base):
    __tablename__ = "answer"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("question.id"), nullable=False)
    answer_text = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False)
    answer_order = Column(Integer, nullable=True)

    # Relationship
    question = relationship("QuestionDB", back_populates="answers")