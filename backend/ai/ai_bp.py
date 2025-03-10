from flask import Blueprint, request, jsonify
from flasgger import swag_from
from utils.gemini import demo
from utils.twilio import send_sms
from backend.models import db


ai_bp = Blueprint('ai_bp', __name__)
