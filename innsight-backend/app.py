from flask import Flask
from flask_cors import CORS
from routes.mood import mood_bp
from routes.intention import intention_bp
from auth import verify_token

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# SQLite config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/innsight.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# TODO: Initialize your DB (e.g. SQLAlchemy)
from db.models import db
db.init_app(app)

# Register routes
app.register_blueprint(mood_bp, url_prefix="/api")
app.register_blueprint(intention_bp, url_prefix="/api")

# Health check route
@app.route("/api/ping")
def ping():
    return {"message": "pong"}

if __name__ == "__main__":
    app.run(debug=True)
