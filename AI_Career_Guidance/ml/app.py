from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import fitz  # PyMuPDF

app = Flask(__name__)
CORS(app)

# Load ML model
model = joblib.load("model.pkl")

SKILLS = [
    "python", "java", "c", "sql", "html", "css",
    "javascript", "react", "node", "mongodb",
    "machine learning", "ai"
]

# -----------------------------
# Resume Skill Extraction
# -----------------------------
def extract_skills(pdf_file):
    doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
    text = " ".join(page.get_text().lower() for page in doc)

    found_skills = [skill for skill in SKILLS if skill in text]
    return found_skills, len(found_skills)

# -----------------------------
# Role Suggestion
# -----------------------------
def suggest_role(skills):
    skills = set(skills)

    if {"python", "machine learning", "ai"}.issubset(skills):
        return "Machine Learning Engineer"
    elif {"html", "css", "javascript", "react"}.issubset(skills):
        return "Web Developer"
    elif {"python", "sql"}.issubset(skills):
        return "Data Analyst"
    else:
        return "General IT Roles"

# -----------------------------
# ✅ Resume Improvement Tips
# -----------------------------
def resume_tips(skill_score, career):
    tips = []

    if skill_score < 4:
        tips.append("Add more technical skills relevant to your domain.")
        tips.append("Mention hands-on projects with GitHub links.")

    if "Higher Studies" in career:
        tips.append("Highlight academic achievements and certifications.")
        tips.append("Include research papers or competitive exam preparation.")

    if "Placement" in career:
        tips.append("Quantify internship impact using numbers.")
        tips.append("Tailor resume keywords to job descriptions.")

    tips.append("Keep resume to 1 page with clear sections.")
    tips.append("Use action verbs and measurable results.")

    return tips

# -----------------------------
# Prediction API
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    resume = request.files["resume"]

    cgpa = float(request.form["cgpa"])
    internships = int(request.form["internships"])
    projects = int(request.form["projects"])
    certifications = int(request.form["certifications"])

    resume_skills, skill_score = extract_skills(resume)
    role = suggest_role(resume_skills)

    features = [[cgpa, internships, projects, certifications]]
    prob = model.predict_proba(features)[0][1] * 100

    if prob >= 70:
        career = "Campus Placement / Private Job"
        explanation = "Strong academic profile with relevant skills."
    elif prob >= 45:
        career = "Skill Improvement + Internships"
        explanation = "Good foundation but needs more hands-on experience."
    else:
        career = "Higher Studies / Govt Exams"
        explanation = "Focus on fundamentals and long-term preparation."

    # ✅ Generate resume tips
    tips = resume_tips(skill_score, career)

    return jsonify({
        "placement_probability": round(prob, 2),
        "career_path": career,
        "role": role,
        "skill_score": skill_score,
        "skills_found": resume_skills,
        "explanation": explanation,
        "resume_tips": tips   # 🔥 NEW
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)