# Module Title:         Programming for Information Systems
# Module Code:          B9IS123
# Module Instructor:    Paul Laird
# Assessment Title:     Reactive Web-Based Information System
# Assessment Number:    2
# Assessment Type:      Practical
# Assessment Weighting: 70%
# Assessment Due Date:  Sunday, 14 December 2025, 2:28 PM
# Student Name:         Mateus Fonseca Campos
# Student ID:           20095949
# Student Email:        20095949@mydbs.ie
# GitHub Repo:          https://github.com/20095949-mateus-campos/programming-ca2

# This file was originally sourced from Miguel Grinberg's blog.
# Link: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database.
# Changes have been commented where applicable.

from flask import Flask
from .config import *
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def create_app(testing=False):
    app = Flask(__name__)
    
    if testing:
        app.config.from_object(TestingConfig)        
    else:
        app.config.from_object(DevelopmentConfig)
    
    db.init_app(app)
    migrate = Migrate(app, db)

    return [app, db]

app, db = create_app()

from app import routes, models
