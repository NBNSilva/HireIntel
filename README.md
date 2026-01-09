# HireIntel – AI-Assisted Recruitment System

HireIntel is a web-based AI-assisted recruitment platform designed to support Human Resource (HR) teams in shortlisting candidates fairly and efficiently. Instead of relying on traditional CV parsing, HireIntel uses structured candidate input and a trained machine learning model to generate relevance scores while keeping human decision-making in control.

This project was developed as part of the Higher National Diploma (HND) Computing – Research Project.

---

## Key Features

### Candidate Side
- Public candidate landing page  
- Secure login and signup  
- Structured job application form (no CV upload)  
- Standardized and fair data collection  
- Confirmation message after form submission  

### HR Side
- Separate HR landing page  
- Secure HR login  
- Admin dashboard with:
  - List of submitted candidates  
  - AI suitability score  
  - AI classification result (Suitable / Not Suitable)  

### AI & Automation
- Supervised machine learning classification model  
- Trained using a real dataset from Kaggle  
- Predicts candidate suitability based on job-relevant attributes  
- Transparent and explainable scoring approach  

---

## AI Model Overview

- Type: Supervised Classification  
- Algorithm: Logistic Regression (scikit-learn pipeline)  
- Input Features:
  - Education  
  - Experience (Years)  
  - Skills  
  - Certifications  
  - Projects Count  
  - Job Role  
- Output:
  - Suitability prediction  
  - Probability-based AI score  

The model is trained offline and loaded into the Flask backend for real-time inference.

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Python (Flask)
- Flask-CORS
- SQLAlchemy
- SQLite
- Joblib
- Pandas
- Scikit-learn

### Tools
- VS Code
- Postman
- Git & GitHub
- Kaggle (dataset source)

---
```bash
## Project Structure
HireIntel/
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── CandidateLanding.jsx
│ │ │ ├── CandidateForm.jsx
│ │ │ ├── AdminDashboard.jsx
│ │ │ ├── HRLanding.jsx
│ │ ├── components/
│ │ │ └── Navbar.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│
├── backend/
│ ├── app.py
│ ├── database.py
│ ├── train_model.py
│ ├── dataset.csv
│ ├── model/
│ │ └── hireintel_model.pkl
│ └── instance/
│ └── hireintel.db
│
└── README.md
```

---

## Installation and Setup

### Clone the Repository

```bash
  git clone https://github.com/your-username/HireIntel.git
  cd HireIntel
```


---

### Backend Setup

```bash
cd backend
py -m pip install -r requirements.txt
py app.py
```

Backend runs on:

```bash
http://127.0.0.1:5000
```

---

### Frontend Setup (Candidate Side)

```bash
cd frontend
npm install
npm run dev
```

Candidate application runs on:

```bash
http://localhost:5173
```

---

### HR Frontend (Optional Separate Port)

```bash
npm run dev -- --port 5174
```

HR application runs on:

```bash
http://localhost:5174
```

---

## Default HR Account



Email: hr@hireintel.com

Password: admin123


For academic and demonstration purposes only.

---

## Database

- Database: SQLite  
- ORM: SQLAlchemy  
- Tables:
  - Users  
  - Applications  

The database is automatically created on first backend execution.

---

## Academic Value

This project demonstrates:
- Applied machine learning  
- Ethical AI considerations  
- Human-in-the-loop decision support  
- Full-stack system development  
- Data-driven recruitment automation  

---

## Future Enhancements

- Role-based access protection  
- Model retraining through dashboard  
- Skill auto-suggestions  
- Explainable AI visualizations  
- Cloud deployment  

---

## Author

**Name:** N. Benul Nethmitha Silva  
**Programme:** HND in Computing  
**Project Type:** Final Research Project  

---

## License

This project is intended for educational purposes only.


