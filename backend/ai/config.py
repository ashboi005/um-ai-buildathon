from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger
from dotenv import load_dotenv
import os

db = SQLAlchemy() 

load_dotenv()  

def configure_app(app: Flask):  
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')   
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SWAGGER'] = {
        'title': 'Your API',
        'uiversion': 3
    }

    db.init_app(app)  
    Swagger(app)    