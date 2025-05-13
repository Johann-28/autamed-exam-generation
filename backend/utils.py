from typing import List
from fastapi import UploadFile
from extractor import extract_text_from_pdf, extract_text_from_pptx

def combine_text_from_files(files: List[UploadFile]) -> str:
    """Combines the text extracted from multiple files."""
    text = ""
    for file in files:
        if file.content_type == 'application/pdf':
            file_bytes = file.file.read()
            text += f"{file.filename} \n"
            text += extract_text_from_pdf(file_bytes)
            file.file.seek(0)  # Reset the file pointer after reading
        elif file.content_type == 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            file_bytes = file.file.read()
            text += f"{file.filename} \n"
            text += extract_text_from_pptx(file_bytes)
            file.file.seek(0)  # Reset the file pointer after reading
    return text