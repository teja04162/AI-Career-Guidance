def recommend_career(cgpa, skills, internships):
    if cgpa >= 8.5 and skills >= 5 and internships == 1:
        return "Private Job / Campus Placement"
    elif cgpa >= 8.0:
        return "Higher Studies (MS)"
    elif skills >= 4:
        return "MBA"
    else:
        return "Government Exams"

# -------- TEST CASE --------
cgpa = 8.5
skills = 5
internships = 1

career = recommend_career(cgpa, skills, internships)
print("🎓 Recommended Career Path:", career)
