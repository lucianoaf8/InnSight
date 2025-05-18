import firebase_admin
from firebase_admin import credentials, auth
from flask import request, jsonify
from functools import wraps

# TODO: Replace with your Firebase service account key file
cred = credentials.Certificate("firebase-service-account.json")
firebase_admin.initialize_app(cred)

def verify_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = None

        if "Authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            if auth_header.startswith("Bearer "):
                id_token = auth_header[7:]

        if not id_token:
            return jsonify({"error": "Unauthorized"}), 401

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
        except Exception as e:
            return jsonify({"error": "Invalid token"}), 403

        return f(*args, **kwargs)

    return decorated_function
