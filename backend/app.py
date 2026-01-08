from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

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

    # AI FEATURES
    features = [[
        int(data["experience"]),
        len(data["skills"].split(","))
    ]]

    prediction = model.predict(features)[0]
    result = "Suitable" if prediction == 1 else "Not Suitable"

    application = Application(
        user_id=data["user_id"],
        first_name=data["firstName"],
        last_name=data["lastName"],
        email=data["email"],
        education=data["education"],
        experience=data["experience"],
        skills=data["skills"],
        ai_result=result
    )

    db.session.add(application)
    db.session.commit()

    return jsonify({"ai_result": result})

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
