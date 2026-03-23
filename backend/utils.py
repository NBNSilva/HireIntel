# backend/utils.py

def comma_tokenizer(text):
    return [s.strip() for s in text.split(',') if s.strip()]
