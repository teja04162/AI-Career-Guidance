import pickle
import numpy as np

# Load trained model
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

def predict_placement(cgpa, skills, internships, certifications, projects):
    data = np.array([[cgpa, skills, internships, certifications, projects]])
    probability = model.predict_proba(data)[0][1]
    return round(probability * 100, 2)

# -------- TEST CASE --------
cgpa = 8.5
skills = 5
internships = 1
certifications = 3
projects = 4

result = predict_placement(cgpa, skills, internships, certifications, projects)
print(f"🎯 Placement Probability: {result}%")
