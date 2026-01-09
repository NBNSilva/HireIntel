from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'candidate' or 'hr'


class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(120))

    education = db.Column(db.String(100))
    experience = db.Column(db.Integer)
    skills = db.Column(db.String(300))

    ai_score = db.Column(db.Float)
    ai_result = db.Column(db.String(50))
