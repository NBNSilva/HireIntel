import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
df = pd.read_csv("dataset.csv")

# Encode target label
df['Recruiter Decision'] = df['Recruiter Decision'].map({
    'Hire': 1,
    'Reject': 0
})

# Select features and label
X = df[
    [
        'Skills',
        'Education',
        'Experience (Years)',
        'Certifications',
        'Job Role',
        'Projects Count'
    ]
]

y = df['Recruiter Decision']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Preprocessing
categorical_features = [
    'Skills',
    'Education',
    'Certifications',
    'Job Role'
]

numerical_features = [
    'Experience (Years)',
    'Projects Count'
]

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
        ('num', 'passthrough', numerical_features)
    ]
)

# Model pipeline
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression(max_iter=1000))
])

# Train model
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy:.2f}")

# Save model
joblib.dump(model, "hireintel_model.pkl")
print("Model saved as hireintel_model.pkl")
