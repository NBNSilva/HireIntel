from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import pandas as pd
from datetime import datetime

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

# ────────────────────────────────────────────────
# MODELS
# ────────────────────────────────────────────────

class Job(db.Model):
    __tablename__ = "jobs"
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    skills = db.Column(db.Text)               # comma-separated
    requirements = db.Column(db.Text)         # newline-separated
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # created_by = db.Column(db.Integer, db.ForeignKey("user.id"))  # optional for future

# ────────────────────────────────────────────────
# CREATE TABLES + DEFAULT HR ACCOUNT
# ────────────────────────────────────────────────

with app.app_context():
    db.create_all()
    
    # Auto-create default HR account if it doesn't exist
    hr_user = User.query.filter_by(role="hr").first()
    if not hr_user:
        hr = User(
            email="hr@hireintel.com",
            password="admin123",          # TODO: In production → use hashed passwords!
            role="hr"
        )
        db.session.add(hr)
        db.session.commit()

# ────────────────────────────────────────────────
# AUTH: SIGN UP (candidate only)
# ────────────────────────────────────────────────
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 400

    user = User(
        email=data["email"],
        password=data["password"],  # TODO: Hash password in production (e.g. bcrypt)
        role="candidate"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Candidate account created"}), 201

# ────────────────────────────────────────────────
# AUTH: LOGIN (both HR and candidate)
# ────────────────────────────────────────────────
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password required"}), 400

    user = User.query.filter_by(
        email=data["email"],
        password=data["password"]   # TODO: Compare hashed password in production
    ).first()

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "user_id": user.id,
        "role": user.role
    })

# ────────────────────────────────────────────────
# HR: CREATE JOB POST
# ────────────────────────────────────────────────
@app.route("/hr/job", methods=["POST"])
def create_job():
    data = request.json

    if not data.get("title") or not data.get("description"):
        return jsonify({"error": "Title and description are required"}), 400

    job = Job(
        title=data["title"],
        description=data["description"],
        skills=",".join([s.strip() for s in data.get("skills", []) if s.strip()]),
        requirements="\n".join([r.strip() for r in data.get("requirements", []) if r.strip()]),
    )

    db.session.add(job)
    db.session.commit()

    return jsonify({
        "message": "Job created successfully",
        "job_id": job.id
    }), 201

# ────────────────────────────────────────────────
# PUBLIC: GET ALL JOBS (used by both candidates and HR dashboard)
# ────────────────────────────────────────────────
@app.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = Job.query.order_by(Job.created_at.desc()).all()

    result = []
    for job in jobs:
        result.append({
            "id": job.id,
            "title": job.title,
            "description": job.description,
            "skills": [s.strip() for s in (job.skills or "").split(",") if s.strip()],
            "requirements": [r.strip() for r in (job.requirements or "").split("\n") if r.strip()],
            "created_at": job.created_at.isoformat() if job.created_at else None
        })

    return jsonify(result)

# ────────────────────────────────────────────────
# HR: DELETE JOB POST
# ────────────────────────────────────────────────
@app.route("/hr/job/<int:job_id>", methods=["DELETE"])
def delete_job(job_id):
    job = Job.query.get(job_id)

    if not job:
        return jsonify({"error": "Job not found"}), 404

    db.session.delete(job)
    db.session.commit()

    return jsonify({"message": "Job deleted successfully"}), 200

# ────────────────────────────────────────────────
# CANDIDATE: SUBMIT APPLICATION + GET AI SCORE
# ────────────────────────────────────────────────
@app.route("/candidate/submit", methods=["POST"])
def submit_candidate():
    data = request.json

    # Required fields validation
    required = ["firstName", "lastName", "email", "education", "experience", "skills"]
    for field in required:
        if field not in data or not data[field]:
            return jsonify({"error": f"{field} is required"}), 400

    education = data.get("education")
    experience = int(data.get("experience", 0))
    skills = data.get("skills", "")
    job_role = data.get("job_role", "Software Developer")
    certifications = data.get("certifications", "None")
    projects_count = int(data.get("projects_count", 0))

    # Prepare input for model (must match training columns exactly)
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

    # Save to database
    application = Application(
        first_name=data["firstName"],
        last_name=data["lastName"],
        email=data["email"],
        education=education,
        experience=experience,
        skills=skills,
        ai_score=ai_score,
        ai_result=ai_result
        # You can add: job_id = data.get("job_id") later
    )

    db.session.add(application)
    db.session.commit()

    return jsonify({
        "status": "success",
        "ai_score": ai_score,
        "result": ai_result
    })

# ────────────────────────────────────────────────
# HR: VIEW ALL CANDIDATE APPLICATIONS
# ────────────────────────────────────────────────
@app.route("/hr/candidates", methods=["GET"])
def hr_candidates():
    applications = Application.query.all()

    data = []
    for app in applications:
        data.append({
            "name": f"{app.first_name} {app.last_name}",
            "education": app.education,
            "experience": app.experience,
            "skills": app.skills,
            "result": app.ai_result,
            "ai_score": app.ai_score,
            # Optional: "applied_at": app.created_at.isoformat() if you add timestamp
        })

    return jsonify(data)

# ────────────────────────────────────────────────
# RUN SERVER
# ────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True, port=5000)