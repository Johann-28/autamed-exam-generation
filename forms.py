import os
import json
import pickle
import requests
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Scope required to create Google Forms
SCOPES = ['https://www.googleapis.com/auth/drive']

def get_credentials():
    """Obtain OAuth 2.0 credentials."""
    creds = None
    
    # Load saved credentials if they exist
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    
    # If no valid credentials, do login
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials2.json', SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save credentials for next use
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    
    return creds

def create_empty_form(title, description):
    """
    Create an empty Google Form in Drive.
    
    Args:
        title: Title of the form
        description: Description of the form
    
    Returns:
        The ID of the created form
    """
    creds = get_credentials()
    
    drive_service = build('drive', 'v3', credentials=creds)
    
    form_metadata = {
        'name': title,
        'mimeType': 'application/vnd.google-apps.form',
        'description': description
    }
    
    form = drive_service.files().create(body=form_metadata).execute()
    return form.get('id')

def configure_quiz(form_id, title, description, questions, apps_script_url):
    """
    Configure an existing form as a quiz using a Google Apps Script web service.
    
    Args:
        form_id: ID of the Google Form
        title: Quiz title
        description: Quiz description
        questions: List of question dictionaries
        apps_script_url: URL of the Apps Script web service
    
    Returns:
        Response from the Apps Script service
    """
    payload = {
        'formId': form_id,
        'title': title,
        'description': description,
        'questions': questions
    }
    
    response = requests.post(
        apps_script_url,
        json=payload,
        headers={'Content-Type': 'application/json'}
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error calling Apps Script: {response.status_code} - {response.text}")

def create_complete_quiz(title, description, questions, apps_script_url):
    """
    Create a complete Google Forms quiz with scoring.
    
    Args:
        title: Title of the quiz
        description: Description of the quiz
        questions: List of questions formatted for Apps Script
        apps_script_url: URL of the Apps Script web service
    
    Returns:
        URLs of the created form
    """
    try:
        form_id = create_empty_form(title, description)
        print(f"Form created with ID: {form_id}")
        
        result = configure_quiz(form_id, title, description, questions, apps_script_url)
        
        if result.get('success'):
            print("Quiz configured successfully")
            return result
        else:
            raise Exception(f"Apps Script error: {result.get('error')}")
            
    except HttpError as error:
        print(f"API error: {error}")
        raise
    except Exception as e:
        print(f"Error: {str(e)}")
        raise

def convert_questions_format(original_questions):
    """
    Convert question format from Python to the format required by Apps Script.
    
    Args:
        original_questions: List of questions in Python format
        
    Returns:
        List of questions for Apps Script
    """
    apps_script_questions = []
    
    for q in original_questions:
        new_q = {
            'title': q['question'],
            'points': q['points'],
            'feedback': {
                'correct': 'Correct!',
                'incorrect': 'Incorrect answer.'
            }
        }
        
        if q['type'] == 'RADIO':
            new_q['type'] = 'MULTIPLE_CHOICE'
            new_q['options'] = q['options']
            new_q['correctAnswer'] = q['correct_answers'][0]
        elif q['type'] == 'CHECKBOX':
            new_q['type'] = 'CHECKBOX'
            new_q['options'] = q['options']
            new_q['correctAnswers'] = q['correct_answers']
        elif q['type'] == 'TEXT':
            new_q['type'] = 'TEXT'
            new_q['correctAnswer'] = q['correct_answers'][0]
            new_q['feedback']['general'] = 'Thanks for your answer.'
        
        apps_script_questions.append(new_q)
    
    return apps_script_questions

def main():
    """Main function to run the program."""
    APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz9vCvcMSvT8KuKiWPUZy0kkcatRc2ETfXunVpHVVsTULwc3LdBVB7z4iQt1Quyw4BF/exec"
    
    title = "Test Quiz"
    description = "This is a sample quiz with 3 questions and scoring."
    
    original_questions = [
        {
            'question': 'What is the capital of France?',
            'type': 'RADIO',
            'options': ['Paris', 'London', 'Madrid', 'Rome'],
            'correct_answers': ['Paris'],
            'points': 1
        },
        {
            'question': 'Which programming language are we using?',
            'type': 'RADIO',
            'options': ['Java', 'Python', 'C++', 'JavaScript'],
            'correct_answers': ['Python'],
            'points': 3
        },
        {
            'question': 'What is the result of 5 * 8?',
            'type': 'RADIO',
            'options': ['13', '40', '35', '45'],
            'correct_answers': ['40'],
            'points': 1
        }
    ]
    
    questions_for_apps_script = convert_questions_format(original_questions)
    
    try:
        result = create_complete_quiz(title, description, questions_for_apps_script, APPS_SCRIPT_URL)
        print("\nQuiz created and configured successfully!")
        print(f"Edit URL: {result['formUrl']}")
        #print(f"Published URL: {result['publishedUrl']}")
    except Exception as e:
        print(f"Execution error: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
