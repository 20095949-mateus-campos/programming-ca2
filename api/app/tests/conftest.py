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

# Flask Docs referenced: https://flask.palletsprojects.com/en/stable/testing/.

import pytest
from app import create_app
from app.routes import blueprint

# pytest fixture app has access to all regular routes but uses an in-memory database
@pytest.fixture()
def test_app():
    test_app, test_db = create_app(testing=True)
    test_app.register_blueprint(blueprint)

    with test_app.app_context():
        # set up
        test_db.create_all()
        
        yield test_app

        # clean up
        test_db.session.remove()
        test_db.drop_all()

# pytest fixture client for HTTP requests
@pytest.fixture()
def clnt(test_app):
    return test_app.test_client()

# pytest fixture context
@pytest.fixture()
def ctxt(test_app):
    return test_app.test_request_context()
