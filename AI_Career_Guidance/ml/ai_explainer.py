import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load .env file
load_dotenv()

# Get API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("❌ GEMINI_API_KEY not found. Check your .env file")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-pro")


def generate_explanation(
    cgpa,
    internships,
    projects,
    certifications,
    skills,
    career,
    probability
):
    prompt = f"""
You are an expert AI career counselor.

Student Profile:
- CGPA: {cgpa}
- Internships: {internships}
- Projects: {projects}
- Certifications: {certifications}
- Skills: {", ".join(skills)}
- Placement Probability: {round(probability, 2)}%
- Recommended Career Path: {career}

Explain clearly:
1. Why this career path suits the student
2. Strengths in their profile
3. What they should focus on next

Tone:
- Friendly
- Motivational
- Simple English
- 5–6 lines only
"""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("Gemini Error:", e)
        return "AI explanation currently unavailable. Please try again later."
