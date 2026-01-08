from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

# ---------------- USERS ----------------
USERS = {
    "candidate1": {"password": "1234", "role": "candidate"},
    "hr1": {"password": "admin123", "role": "hr"}
}

# ---------------- LOAD MODEL ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "hireintel_model.pkl")
model = joblib.load(MODEL_PATH)

DATA_PATH = "data/candidates.csv"

# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = USERS.get(username)

    if user and user["password"] == password:
        return jsonify({
            "success": True,
            "role": user["role"]
        })

    return jsonify({"success": False}), 401

# ---------------- CANDIDATE SUBMIT ----------------
@app.route("/candidate/submit", methods=["POST"])
def submit_candidate():
    data = request.json

    df = pd.DataFrame([data])

    if os.path.exists(DATA_PATH):
        df.to_csv(DATA_PATH, mode="a", header=False, index=False)
    else:
        df.to_csv(DATA_PATH, index=False)

    return jsonify({"message": "Application submitted successfully"})

# ---------------- HR: GET CANDIDATES ----------------
@app.route("/hr/candidates", methods=["GET"])
def get_candidates():
    if not os.path.exists(DATA_PATH):
        return jsonify([])

    df = pd.read_csv(DATA_PATH)
    return jsonify(df.to_dict(orient="records"))

# ---------------- HR: RUN MODEL ----------------
@app.route("/hr/run-model", methods=["POST"])
def run_model():
    df = pd.read_csv(DATA_PATH)

    X = df.drop(columns=["result"], errors="ignore")
    predictions = model.predict(X)

    df["AI_Result"] = predictions
    df.to_csv(DATA_PATH, index=False)

    return jsonify({"message": "Model executed successfully"})

# ---------------- MAIN ----------------
if __name__ == "__main__":
    app.run(debug=True)
