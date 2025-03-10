from flask import Flask
from flask_cors import CORS
from config import configure_app, db
from blueprints.login.login_bp import login_bp
from blueprints.ai.ai_bp import ai_bp
from datetime import datetime

app = Flask(__name__)
configure_app(app)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(login_bp, url_prefix='/auth')
app.register_blueprint(ai_bp, url_prefix='/ai')
with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return "Hello World! Let's Get Started With This Then, Shall We?"

if __name__ == "__main__":
    app.run(debug=True)
