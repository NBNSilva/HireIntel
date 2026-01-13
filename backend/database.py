# database.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'candidate' or 'hr'


class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    skills = db.Column(db.Text)                # stored as comma-separated string
    requirements = db.Column(db.Text)          # stored as newline-separated string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Application(db.Model):
    __tablename__ = "applications"

    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(120))

    education = db.Column(db.String(100))
    experience = db.Column(db.Integer)
    skills = db.Column(db.String(300))

    ai_score = db.Column(db.Float)
    ai_result = db.Column(db.String(50))

    # NEW: Link to the job the candidate applied for
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=True)

    # Optional: Relationship to access job directly (useful in backend queries)
    # job = db.relationship('Job', backref='applications')