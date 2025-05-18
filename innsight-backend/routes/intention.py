from flask import Blueprint, request, jsonify
from db.models import db, DailyIntention
from auth import verify_token
from datetime import datetime

intention_bp = Blueprint("intention", __name__)

@intention_bp.route("/intention/today", methods=["GET"])
@verify_token
def get_today_intention():
    user_id = request.user['uid']
    today = datetime.utcnow().strftime("%Y-%m-%d")
    entry = DailyIntention.query.filter_by(user_id=user_id, date=today).first()
    return jsonify({"intention": entry.intention if entry else ""})

@intention_bp.route("/save-intention", methods=["POST"])
@verify_token
def save_intention():
    user_id = request.user['uid']
    data = request.get_json()
    today = datetime.utcnow().strftime("%Y-%m-%d")

    # TODO: Validate input
    existing = DailyIntention.query.filter_by(user_id=user_id, date=today).first()
    if existing:
        existing.intention = data.get("intention", "")
    else:
        new = DailyIntention(user_id=user_id, date=today, intention=data.get("intention", ""))
        db.session.add(new)

    db.session.commit()
    return jsonify({"message": "Saved"})
