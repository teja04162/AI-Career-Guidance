import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

# Dummy training data (realistic)
data = {
    "cgpa": [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0],
    "internships": [0, 0, 1, 1, 2, 2, 3, 3, 4],
    "projects": [1, 1, 2, 2, 3, 3, 4, 4, 5],
    "certifications": [0, 0, 1, 1, 1, 2, 2, 3, 3],
    "placed": [0, 0, 0, 0, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

X = df.drop("placed", axis=1)
y = df["placed"]

model = LogisticRegression()
model.fit(X, y)

joblib.dump(model, "model.pkl")

print("✅ Model trained and saved as model.pkl")
