import os
import json
import pickle
import requests
from utils.parsing_utils import ParsingUtils
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from models.question import Question

SCOPES = ['https://www.googleapis.com/auth/drive']

class GoogleFormsQuizManager:
    def __init__(self, apps_script_url):
        self.apps_script_url = apps_script_url
        self.dir_path = os.path.dirname(os.path.abspath(__file__))

    def get_credentials(self):
        """Obtain OAuth 2.0 credentials."""
        creds = None
        token_path = os.path.join(self.dir_path, 'token.pickle')

        if os.path.exists(token_path):
            with open(token_path, 'rb') as token:
                creds = pickle.load(token)

        # If no valid credentials, do login
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                credentials_path = os.path.join(self.dir_path, 'credentials2.json')
                flow = InstalledAppFlow.from_client_secrets_file(credentials_path, SCOPES)
                creds = flow.run_local_server(port=0)

            # Save credentials for next use
            with open(token_path, 'wb') as token:
                pickle.dump(creds, token)

        return creds

    def create_empty_form(self, title, description):
        """Create an empty Google Form in Drive."""
        creds = self.get_credentials()
        drive_service = build('drive', 'v3', credentials=creds)

        form_metadata = {
            'name': title,
            'mimeType': 'application/vnd.google-apps.form',
            'description': description
        }

        form = drive_service.files().create(body=form_metadata).execute()
        return form.get('id')

    def configure_quiz(self, form_id, title, description, questions):
        """Configure an existing form as a quiz using a Google Apps Script web service."""
        payload = {
            'formId': form_id,
            'title': title,
            'description': description,
            'questions': questions
        }

        response = requests.post(
            self.apps_script_url,
            json=payload,
            headers={'Content-Type': 'application/json'}
        )

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error calling Apps Script: {response.status_code} - {response.text}")

    def create_complete_quiz(self, title, description, questions):
        """Create a complete Google Forms quiz with scoring."""
        try:
            form_id = self.create_empty_form(title, description)
            print(f"Form created with ID: {form_id}")

            result = self.configure_quiz(form_id, title, description, questions)

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

    def run_sample(self, questions : list[Question], title : str):
        """Sample usage of the class."""
        description = "This is a sample quiz with 3 questions and scoring."

        questions_for_apps_script = ParsingUtils.convert_questions_for_google_forms(questions)

        try:
            result = self.create_complete_quiz(title, description, questions_for_apps_script)
            print("\nQuiz created and configured successfully!")
            print(f"Edit URL: {result['formUrl']}")
            print(f"Published URL: {result['publishedUrl']}")
            return result['formUrl']
        except Exception as e:
            print(f"Execution error: {str(e)}")
            import traceback
            traceback.print_exc()

