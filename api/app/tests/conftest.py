import pytest
from app import create_app
from app.routes import blueprint

@pytest.fixture()
def test_app():
    test_app, test_db = create_app(testing=True)
    test_app.register_blueprint(blueprint)

    with test_app.app_context():
        test_db.create_all()
        
        yield test_app

        test_db.session.remove()
        test_db.drop_all()

@pytest.fixture()
def clnt(test_app):
    return test_app.test_client()

@pytest.fixture()
def ctxt(test_app):
    return test_app.test_request_context()

# @pytest.fixture()
# def runner(test_app):
#     return test_app.test_cli_runner()
