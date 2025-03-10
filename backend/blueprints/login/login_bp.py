from flask import Blueprint, request, jsonify, session
from flasgger import swag_from
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

login_bp = Blueprint('login_bp', __name__)

@swag_from({
    'tags': ['Authentication'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'description': 'User registration details',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string', 'example': 'John Doe'},
                    'phone': {'type': 'string', 'example': '1234567890'},
                    'email': {'type': 'string', 'example': 'john@example.com'},
                    'password': {'type': 'string', 'example': 'secret123'}
                },
                'required': ['name', 'phone', 'email', 'password']
            }
        }
    ],
    'responses': {
        '201': {
            'description': 'User registered successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string', 'example': 'User registered successfully'}
                }
            }
        },
        '400': {
            'description': 'Missing required fields',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string', 'example': 'Missing required fields'}
                }
            }
        },
        '409': {
            'description': 'User already exists',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string', 'example': 'User already exists'}
                }
            }
        }
    }
})
@login_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    password = data.get('password')

    if not name or not phone or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if the user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'User already exists'}), 409

    # Hash the password using Werkzeug
    hashed_password = generate_password_hash(password)

    # Create and store the new user
    new_user = User(name=name, phone=phone, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@swag_from({
    'tags': ['Authentication'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'description': 'User login credentials',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'email': {'type': 'string', 'example': 'john@example.com'},
                    'password': {'type': 'string', 'example': 'secret123'}
                },
                'required': ['email', 'password']
            }
        }
    ],
    'responses': {
        '200': {
            'description': 'Login successful',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string', 'example': 'Login successful'}
                }
            }
        },
        '400': {
            'description': 'Email and password required',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string', 'example': 'Email and password required'}
                }
            }
        },
        '401': {
            'description': 'Invalid credentials',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string', 'example': 'Invalid credentials'}
                }
            }
        }
    }
})
@login_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    # Set up the session for the logged-in user
    session['user_id'] = user.id

    return jsonify({'message': 'Login successful'}), 200
