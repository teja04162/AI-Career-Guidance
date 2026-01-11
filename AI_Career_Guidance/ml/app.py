from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
import hashlib
import sqlite3
from datetime import datetime
import joblib
import fitz  # PyMuPDF

from ai_explainer import generate_explanation

# -----------------------------
# App setup
# -----------------------------
app = Flask(__name__)
CORS(app)

# JWT config
app.config["JWT_SECRET_KEY"] = "super-secret-key-change-this"
jwt = JWTManager(app)

# -----------------------------
# Initialize Database
# -----------------------------
def init_db():
    conn = sqlite3.connect("analytics.db")
    cursor = conn.cursor()

    # Analytics table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cgpa REAL,
        internships INTEGER,
        projects INTEGER,
        certifications INTEGER,
        probability REAL,
        career TEXT,
        role TEXT,
        created_at TEXT
    )
    """)

    # Users table (AUTH)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()

# -----------------------------
# Load ML model
# -----------------------------
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
# Resume Tips
# -----------------------------
def resume_tips(skill_score, career):
    tips = []

    if skill_score < 4:
        tips.append("Add more technical skills relevant to your domain.")
        tips.append("Mention hands-on projects with GitHub links.")

    if "Higher Studies" in career:
        tips.append("Highlight academic achievements and certifications.")

    if "Placement" in career:
        tips.append("Quantify internship impact using numbers.")

    tips.append("Keep resume to 1 page with clear sections.")
    return tips

# -----------------------------
# AUTH APIs
# -----------------------------
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data["email"]
    password = hashlib.sha256(data["password"].encode()).hexdigest()

    conn = sqlite3.connect("analytics.db")
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            (email, password)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({"error": "User already exists"}), 400
    finally:
        conn.close()

    token = create_access_token(identity=email)
    return jsonify({"token": token})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = hashlib.sha256(data["password"].encode()).hexdigest()

    conn = sqlite3.connect("analytics.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (email, password)
    )
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=email)
    return jsonify({"token": token})

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
        explanation = "Good foundation but needs more experience."
    else:
        career = "Higher Studies / Govt Exams"
        explanation = "Focus on fundamentals."

    tips = resume_tips(skill_score, career)

    conn = sqlite3.connect("analytics.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO analytics (
            cgpa, internships, projects, certifications,
            probability, career, role, created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        cgpa, internships, projects, certifications,
        round(prob, 2), career, role,
        datetime.now().isoformat()
    ))
    conn.commit()
    conn.close()

    return jsonify({
        "placement_probability": round(prob, 2),
        "career_path": career,
        "role": role,
        "skill_score": skill_score,
        "skills_found": resume_skills,
        "explanation": explanation,
        "resume_tips": tips
    })

# -----------------------------
# Admin Analytics
# -----------------------------
@app.route("/admin/analytics", methods=["GET"])
def admin_analytics():
    conn = sqlite3.connect("analytics.db")
    cursor = conn.cursor()
    cursor.execute("""
        SELECT career, COUNT(*) FROM analytics GROUP BY career
    """)
    rows = cursor.fetchall()
    conn.close()

    return jsonify([
        {"career": r[0], "count": r[1]} for r in rows
    ])

# -----------------------------
# Health Check
# -----------------------------
@app.route("/")
def home():
    return jsonify({"status": "AI Career Guidance Backend is running 🚀"})

if __name__ == "__main__":
    app.run(debug=True)
