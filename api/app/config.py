# This file was originally sourced from Miguel Grinberg's blog.
# Link: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database.
# Changes have been commented where applicable.

import os
basedir = os.path.abspath(os.path.dirname(__file__))

class DevelopmentConfig():
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')

class TestingConfig():
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
