# Flask Docs referenced: https://flask.palletsprojects.com/en/stable/testing/

import json
from app import db
from app.models import *
from datetime import datetime

# Only entities Tool, Material and Client are tested here.
# However, extending to the other entities should be trivial (only time consuming).

# test function for CRUD operations for the Tool entity
def test_crud_tool(clnt, ctxt):
    old_model = {'name': 'Test Tool'}
    new_model = {'name': 'New Test Tool'}

    with ctxt:
        # Read all
        response = json.loads(clnt.get('/api/read/tool/0').text)
        assert len(db.session.query(Tool).all()) == 0
        assert response == []

        # Create one
        response = json.loads(clnt.post('/api/create/tool', json=old_model).text)
        assert len(db.session.query(Tool).all()) == 1
        model = db.session.get_one(Tool, 1)
        assert model.name == old_model['name']
        assert response['name'] == old_model['name']

        # Read one
        response = json.loads(clnt.get('/api/read/tool/1').text)
        assert response['name'] == old_model['name']

        # Update one
        response = json.loads(clnt.patch('/api/update/tool/1', json=new_model).text)
        model = db.session.get_one(Tool, 1)
        assert model.name == new_model['name']
        assert response['name'] == new_model['name']

        # Delete one
        response = json.loads(clnt.delete('/api/delete/tool/1').text)
        assert len(db.session.query(Tool).all()) == 0

# test function for CRUD operations for the Material entity
def test_crud_material(clnt, ctxt):
    old_model = {'name': 'Test Material'}
    new_model = {'name': 'New Test Material'}

    with ctxt:
        # Read all
        response = json.loads(clnt.get('/api/read/material/0').text)
        assert len(db.session.query(Material).all()) == 0
        assert response == []

        # Create one
        response = json.loads(clnt.post('/api/create/material', json=old_model).text)
        assert len(db.session.query(Material).all()) == 1
        model = db.session.get_one(Material, 1)
        assert model.name == old_model['name']
        assert response['name'] == old_model['name']

        # Read one
        response = json.loads(clnt.get('/api/read/material/1').text)
        assert response['name'] == old_model['name']

        # Update one
        response = json.loads(clnt.patch('/api/update/material/1', json=new_model).text)
        model = db.session.get_one(Material, 1)
        assert model.name == new_model['name']
        assert response['name'] == new_model['name']

        # Delete one
        response = json.loads(clnt.delete('/api/delete/material/1').text)
        assert len(db.session.query(Material).all()) == 0

# test function for CRUD operations for the Client entity
def test_crud_client(clnt, ctxt):
    old_model = {'name': 'Test Client', 'email': 'client@email.com', 'phone': '+353 01 234 5678', 'address': '1 Main St, City Center, Dublin, IE'}
    new_model = {'name': 'New Test Client', 'email': 'new_client@email.com', 'phone': '+353 01 432 8765', 'address': '2 Back St, City West, Dublin, IE'}

    with ctxt:
        # Read all
        response = json.loads(clnt.get('/api/read/client/0').text)
        assert len(db.session.query(Client).all()) == 0
        assert response == []

        # Create one
        response = json.loads(clnt.post('/api/create/client', json=old_model).text)
        assert len(db.session.query(Client).all()) == 1
        model = db.session.get_one(Client, 1)
        assert model.name == old_model['name']
        assert model.email == old_model['email']
        assert model.phone == old_model['phone']
        assert model.address == old_model['address']
        assert response['name'] == old_model['name']
        assert response['email'] == old_model['email']
        assert response['phone'] == old_model['phone']
        assert response['address'] == old_model['address']

        # Read one
        response = json.loads(clnt.get('/api/read/client/1').text)
        assert response['name'] == old_model['name']
        assert response['email'] == old_model['email']
        assert response['phone'] == old_model['phone']
        assert response['address'] == old_model['address']

        # Update one
        response = json.loads(clnt.patch('/api/update/client/1', json=new_model).text)
        model = db.session.get_one(Client, 1)
        assert model.name == new_model['name']
        assert model.email == new_model['email']
        assert model.phone == new_model['phone']
        assert model.address == new_model['address']
        assert response['name'] == new_model['name']
        assert response['email'] == new_model['email']
        assert response['phone'] == new_model['phone']
        assert response['address'] == new_model['address']

        # Delete one
        response = json.loads(clnt.delete('/api/delete/client/1').text)
        assert len(db.session.query(Client).all()) == 0
