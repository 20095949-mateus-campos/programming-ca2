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
