from flask import Blueprint, request, jsonify
from db.models import db, MoodEntry
from auth import verify_token
from datetime import datetime

mood_bp = Blueprint("mood", __name__)

@mood_bp.route("/log-mood", methods=["POST"])
@verify_token
def log_mood():
    user_id = request.user['uid']
    data = request.get_json()
    today = datetime.utcnow().strftime("%Y-%m-%d")

    # TODO: Validate data payload
    new_entry = MoodEntry(
        user_id=user_id,
        date=today,
        emojis=','.join(data.get("emojis", [])),
        journal=data.get("journal", "")
    )
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({"message": "Mood logged"})

@mood_bp.route("/entries", methods=["GET"])
@verify_token
def get_entries():
    user_id = request.user['uid']
    entries = MoodEntry.query.filter_by(user_id=user_id).order_by(MoodEntry.date.desc()).all()

    # TODO: Return structured response
    return jsonify([
        {
            "date": e.date,
            "emojis": e.emojis.split(',') if e.emojis else [],
            "journal": e.journal
        } for e in entries
    ])
