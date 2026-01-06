import fitz  # PyMuPDF

# Skill database
SKILLS = [
    "python", "java", "c", "c++", "sql",
    "html", "css", "javascript",
    "react", "node", "mongodb",
    "machine learning", "data science",
    "deep learning", "ai"
]

def parse_resume(file_path):
    doc = fitz.open(file_path)
    text = ""

    for page in doc:
        text += page.get_text()

    text = text.lower()
    extracted_skills = []

    for skill in SKILLS:
        if skill in text:
            extracted_skills.append(skill)

    return extracted_skills

# -------- TEST CASE --------
resume_path = "sample_resume.pdf"  # resume in same folder
skills = parse_resume(resume_path)

print("📄 Extracted Skills from Resume:")
print(skills)
