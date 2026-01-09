from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import pandas as pd


from database import db, User, Application

app = Flask(__name__)
CORS(app)

# DATABASE CONFIG
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///hireintel.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# LOAD AI MODEL
MODEL_PATH = os.path.join("model", "hireintel_model.pkl")
model = joblib.load(MODEL_PATH)

# -------------------------------
# CREATE DATABASE TABLES (ONCE)
# -------------------------------

with app.app_context():
    db.create_all()
    # AUTO-CREATE HR ACCOUNT IF NOT EXISTS
    hr_user = User.query.filter_by(role="hr").first()
    if not hr_user:
        hr = User(
            email="hr@hireintel.com",
            password="admin123",
            role="hr"
        )
        db.session.add(hr)
        db.session.commit()



# -------------------------------
# AUTH: SIGN UP (CANDIDATE ONLY)
# -------------------------------
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    user = User(
        email=data["email"],
        password=data["password"],
        role="candidate"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Candidate account created"})

# -------------------------------
# AUTH: LOGIN (HR + CANDIDATE)
# -------------------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(
        email=data["email"],
        password=data["password"]
    ).first()

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "user_id": user.id,
        "role": user.role
    })

# -------------------------------
# CANDIDATE SUBMIT FORM + AI
# -------------------------------
@app.route("/candidate/submit", methods=["POST"])
def submit_candidate():
    data = request.json

    # Extract form values
    education = data.get("education")
    experience = int(data.get("experience", 0))
    skills = data.get("skills", "")
    job_role = data.get("job_role", "Software Developer")
    certifications = data.get("certifications", "None")
    projects_count = int(data.get("projects_count", 0))

    # 🔑 MATCH TRAINING DATASET COLUMN NAMES EXACTLY
    input_df = pd.DataFrame([{
        "Education": education,
        "Experience (Years)": experience,
        "Skills": skills,
        "Certifications": certifications,
        "Projects Count": projects_count,
        "Job Role": job_role
    }])

    # AI Prediction
    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0][1]

    ai_result = "Suitable" if prediction == 1 else "Not Suitable"
    ai_score = round(float(probability) * 100, 2)

    # ✅ SAVE USING SQLALCHEMY
    application = Application(
        first_name=data["firstName"],
        last_name=data["lastName"],
        email=data["email"],
        education=education,
        experience=experience,
        skills=skills,
        ai_score=ai_score,
        ai_result=ai_result
    )

    db.session.add(application)
    db.session.commit()

    return jsonify({
        "status": "success",
        "ai_score": ai_score,
        "result": ai_result
    })

# -------------------------------
# HR DASHBOARD: VIEW CANDIDATES
# -------------------------------
@app.route("/hr/candidates", methods=["GET"])
def hr_candidates():
    applications = Application.query.all()

    data = []
    for app_data in applications:
        data.append({
            "name": f"{app_data.first_name} {app_data.last_name}",
            "education": app_data.education,
            "experience": app_data.experience,
            "skills": app_data.skills,
            "result": app_data.ai_result
        })

    return jsonify(data)

# -------------------------------
# RUN SERVER
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)
