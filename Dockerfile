# Stage 1: Build the React Frontend
FROM node:20 AS build
WORKDIR /app/frontend

# Copy frontend source
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install

# Copy all frontend files to build them
COPY frontend/ ./
RUN echo "VITE_API_URL=" > .env
RUN npm run build

# Stage 2: Serve using Python
FROM python:3.10-slim

# Creates a new user 'user' with UID 1000 (Required for Hugging Face Spaces)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

WORKDIR $HOME/app

# Copy the backend code and trained model
COPY --chown=user backend/ $HOME/app/backend/

# Upgrade pip and install requirements
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r $HOME/app/backend/requirements.txt
RUN pip install --no-cache-dir gunicorn

# Pre-initialize Database
WORKDIR $HOME/app/backend
RUN python -c "from app import app, db; app.app_context().push(); db.create_all()"

# Copy the built React app from Stage 1 directly inside the final container
COPY --from=build --chown=user /app/frontend/dist $HOME/app/frontend/dist

# Expose Space port
EXPOSE 7860

# Command to run the application
CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]
