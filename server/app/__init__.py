from flask import Flask
from flask_cors import CORS
from app.routes.analyze import analyze_bp
from dotenv import load_dotenv
load_dotenv()

def create_app():
    
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(analyze_bp)

    return app
