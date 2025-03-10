from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger
from dotenv import load_dotenv
import os

db = SQLAlchemy()  

load_dotenv()  

def configure_app(app: Flask): 
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')   
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_pre_ping': True,
    'pool_recycle': 280,
    'connect_args': {'sslmode': 'require'}
}
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SWAGGER'] = {
        'title': 'Your API',
        'uiversion': 3
    }
    app.config['SCHEDULER_API_ENABLED'] = True
    app.secret_key='ncq8ur271bGFR5a9GR69n239ybAFf20B1*21@'

    db.init_app(app)    
    Swagger(app)    