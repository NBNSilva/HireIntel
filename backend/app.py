from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import pandas as pd
from datetime import datetime

from database import db, User, Application, Job   # ← make sure Job is imported

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
# CREATE TABLES + DEFAULT HR ACCOUNT
# ────────────────────────────────────────────────

with app.app_context():
    db.create_all()
    
    hr_user = User.query.filter_by(role="hr").first()
    if not hr_user:
        hr = User(
            email="hr@hireintel.com",
            password="admin123",          # TODO: Hash passwords in production
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
        password=data["password"],
        role="candidate"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Candidate account created"}), 201

# ────────────────────────────────────────────────
# AUTH: LOGIN
# ────────────────────────────────────────────────
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

# ────────────────────────────────────────────────
# HR: CREATE JOB
# ────────────────────────────────────────────────
@app.route("/hr/job", methods=["POST"])
def create_job():
    data = request.json

    if not data.get("title") or not data.get("description"):
        return jsonify({"error": "Title and description required"}), 400

    job = Job(
        title=data["title"],
        description=data["description"],
        skills=",".join([s.strip() for s in data.get("skills", []) if s.strip()]),
        requirements="\n".join([r.strip() for r in data.get("requirements", []) if r.strip()]),
    )

    db.session.add(job)
    db.session.commit()

    return jsonify({"message": "Job created", "job_id": job.id}), 201

# ────────────────────────────────────────────────
# PUBLIC: LIST JOBS
# ────────────────────────────────────────────────
@app.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = Job.query.order_by(Job.created_at.desc()).all()
    return jsonify([{
        "id": j.id,
        "title": j.title,
        "description": j.description,
        "skills": [s.strip() for s in (j.skills or "").split(",") if s.strip()],
        "requirements": [r.strip() for r in (j.requirements or "").split("\n") if r.strip()],
        "created_at": j.created_at.isoformat() if j.created_at else None
    } for j in jobs])

# ────────────────────────────────────────────────
# HR: DELETE JOB
# ────────────────────────────────────────────────
@app.route("/hr/job/<int:job_id>", methods=["DELETE"])
def delete_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted"}), 200

# ────────────────────────────────────────────────
# CANDIDATE: SUBMIT APPLICATION (no AI yet)
# ────────────────────────────────────────────────
@app.route("/candidate/submit", methods=["POST"])
def submit_candidate():
    data = request.json

    required = ["firstName", "lastName", "email", "education", "experience", "skills"]
    for field in required:
        if field not in data or not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    application = Application(
        first_name=data["firstName"],
        last_name=data["lastName"],
        email=data["email"],
        education=data.get("education"),
        experience=int(data.get("experience", 0)),
        skills=data.get("skills", ""),
        job_id=data.get("job_id")   # ← can be null
    )

    db.session.add(application)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Application received",
        "application_id": application.id
    }), 201

# ────────────────────────────────────────────────
# HR: ANALYZE ALL PENDING
# ────────────────────────────────────────────────
@app.route("/hr/analyze-all", methods=["POST"])
def analyze_all():
    pending = Application.query.filter(
        (Application.ai_score.is_(None)) | (Application.ai_score == 0)
    ).all()

    if not pending:
        return jsonify({"message": "No pending applications"}), 200

    updated = 0
    for app in pending:
        try:
            input_df = pd.DataFrame([{
                "Education": app.education,
                "Experience (Years)": app.experience,
                "Skills": app.skills,
                "Certifications": "None",
                "Projects Count": 0,
                "Job Role": "Software Developer"
            }])

            prediction = model.predict(input_df)[0]
            probability = model.predict_proba(input_df)[0][1]

            app.ai_result = "Suitable" if prediction == 1 else "Not Suitable"
            app.ai_score = round(float(probability) * 100, 2)
            updated += 1
        except Exception as e:
            print(f"Error analyzing {app.id}: {e}")

    db.session.commit()
    return jsonify({"message": f"Analyzed {updated} application(s)"}), 200

# ────────────────────────────────────────────────
# HR: LIST ALL APPLICATIONS (with job title)
# ────────────────────────────────────────────────
@app.route("/hr/candidates", methods=["GET"])
def hr_candidates():
    # Join with Job to get title
    results = db.session.query(
        Application,
        Job.title.label("job_title")
    ).outerjoin(Job, Application.job_id == Job.id).all()

    data = []
    for app, job_title in results:
        data.append({
            "id": app.id,
            "name": f"{app.first_name} {app.last_name}",
            "email": app.email,
            "education": app.education,
            "experience": app.experience,
            "skills": app.skills,
            "ai_score": app.ai_score,
            "result": app.ai_result or "Pending",
            "job_title": job_title or "Not specified"
        })

    return jsonify(data)

# ────────────────────────────────────────────────
# HR: DELETE APPLICATION
# ────────────────────────────────────────────────
@app.route("/hr/candidate/<int:candidate_id>", methods=["DELETE"])
def delete_candidate(candidate_id):
    app = Application.query.get(candidate_id)
    if not app:
        return jsonify({"error": "Not found"}), 404

    db.session.delete(app)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)