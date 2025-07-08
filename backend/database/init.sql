-- backend/database/init.sql
-- Initialization script for PostgreSQL

SELECT 'Starting database initialization...' as message;

-- Create tables with PostgreSQL syntax
CREATE TABLE IF NOT EXISTS exam (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    google_forms_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS question (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER REFERENCES exam(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'multiple_choice',
    question_order INTEGER,
    score DECIMAL(5,2) DEFAULT 1.0
);

CREATE TABLE IF NOT EXISTS answer (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES question(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    answer_order INTEGER
);

-- Insert some test data
INSERT INTO exam (name, is_active) VALUES 
    ('Test Exam 1', true),
    ('Test Exam 2', false)
ON CONFLICT DO NOTHING;

INSERT INTO question (exam_id, question_text, question_type, question_order, score) VALUES 
    (1, 'What is the capital of France?', 'multiple_choice', 1, 2.0),
    (1, 'Select the primary colors', 'checkbox', 2, 3.0)
ON CONFLICT DO NOTHING;

INSERT INTO answer (question_id, answer_text, is_correct, answer_order) VALUES 
    (1, 'Paris', true, 1),
    (1, 'London', false, 2),
    (1, 'Madrid', false, 3),
    (2, 'Red', true, 1),
    (2, 'Blue', true, 2),
    (2, 'Green', false, 3)
ON CONFLICT DO NOTHING;

-- Verify that the tables were created
SELECT 'Database initialized successfully!' as status;
SELECT 'Total exams: ' || COUNT(*) as exams_count FROM exam;
SELECT 'Total questions: ' || COUNT(*) as questions_count FROM question;
SELECT 'Total answers: ' || COUNT(*) as answers_count FROM answer;