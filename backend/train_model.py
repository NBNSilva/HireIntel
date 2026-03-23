import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
df = pd.read_csv("dataset.csv")

# Encode target label
df['Recruiter Decision'] = df['Recruiter Decision'].map({
    'Hire': 1,
    'Reject': 0
})

df['Skills'] = df['Skills'].fillna('None').astype(str)
df['Certifications'] = df['Certifications'].fillna('None').astype(str)
df['Education'] = df['Education'].fillna('Unknown').astype(str)
df['Job Role'] = df['Job Role'].fillna('Unknown').astype(str)
df['Experience (Years)'] = df['Experience (Years)'].fillna(0)
df['Projects Count'] = df['Projects Count'].fillna(0)

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
    'Education',
    'Job Role'
]

numerical_features = [
    'Experience (Years)',
    'Projects Count'
]

from utils import comma_tokenizer

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
        ('skills', CountVectorizer(tokenizer=comma_tokenizer, token_pattern=None, lowercase=True), 'Skills'),
        ('certs', CountVectorizer(tokenizer=comma_tokenizer, token_pattern=None, lowercase=True), 'Certifications'),
        ('num', 'passthrough', numerical_features)
    ]
)

# Model pipeline
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# Train model
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy:.2f}")

# Save model
joblib.dump(model, "model/hireintel_model.pkl")
print("Model saved as model/hireintel_model.pkl")
