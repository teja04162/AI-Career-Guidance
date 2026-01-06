import pickle
import numpy as np
import fitz

# ---------- LOAD ML MODEL ----------
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

# ---------- RESUME PARSER ----------
SKILLS_DB = [
    "python", "java", "c", "c++", "sql",
    "html", "css", "javascript",
    "react", "node", "mongodb",
    "machine learning", "data science",
    "deep learning", "ai"
]

def extract_skills(resume_path):
    doc = fitz.open(resume_path)
    text = ""

    for page in doc:
        text += page.get_text()

    text = text.lower()
    return [skill for skill in SKILLS_DB if skill in text]

# ---------- PLACEMENT PREDICTION ----------
def predict_placement(cgpa, skills, internships, certifications, projects):
    data = np.array([[cgpa, skills, internships, certifications, projects]])
    prob = model.predict_proba(data)[0][1]
    return round(prob * 100, 2)

# ---------- CAREER RECOMMENDATION ----------
def recommend_career(cgpa, skill_count, internships):
    if cgpa >= 8.5 and skill_count >= 5 and internships == 1:
        return "Private Job / Campus Placement"
    elif cgpa >= 8.0:
        return "Higher Studies (MS)"
    elif skill_count >= 4:
        return "MBA"
    else:
        return "Government Exams"

# ---------- FINAL PIPELINE ----------
resume = "sample_resume.pdf"

cgpa = 8.5
internships = 1
certifications = 3
projects = 4

skills_list = extract_skills(resume)
skill_count = len(skills_list)

placement_probability = predict_placement(
    cgpa, skill_count, internships, certifications, projects
)

career = recommend_career(cgpa, skill_count, internships)

print("\n===== 🎓 AI CAREER GUIDANCE RESULT =====")
print("Extracted Skills:", skills_list)
print("Skill Count:", skill_count)
print("Placement Probability:", placement_probability, "%")
print("Recommended Career Path:", career)
