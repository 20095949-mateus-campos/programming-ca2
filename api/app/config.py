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
