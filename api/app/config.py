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

# Flask Docs referenced: https://flask.palletsprojects.com/en/stable/config/#development-production.

import os
basedir = os.path.abspath(os.path.dirname(__file__))

class DevelopmentConfig():
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')

# added testing configuration which uses in-memory database
class TestingConfig():
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
