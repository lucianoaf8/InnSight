from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Optional: User table, useful for tracking more than UID
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MoodEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(128), nullable=False)
    date = db.Column(db.String(20), nullable=False)  # e.g. "2025-05-18"
    emojis = db.Column(db.String(100))               # Stored as comma-separated string
    journal = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class DailyIntention(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(128), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    intention = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
