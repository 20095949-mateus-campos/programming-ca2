import json
from app import db
from app.models import *

def test_crud_tool(clnt, ctxt):
    with ctxt:
        response = json.loads(clnt.get('/api/read/tool/0').text)
        assert len(db.session.query(Tool).all()) == 0
        assert response == []

        response = json.loads(clnt.post('/api/create/tool', json={'name': 'Test Tool'}).text)
        assert len(db.session.query(Tool).all()) == 1
        assert db.session.get_one(Tool, 1).name == 'Test Tool'
        assert response['name'] == 'Test Tool'

        response = json.loads(json.loads(clnt.get('/api/read/tool/0').text)[0])
        assert response['name'] == 'Test Tool'

        response = json.loads(clnt.get('/api/read/tool/1').text)
        assert response['name'] == 'Test Tool'

        response = json.loads(clnt.patch('/api/update/tool/1', json={'name': 'New Test Tool'}).text)
        assert db.session.get_one(Tool, 1).name == 'New Test Tool'
        assert response['name'] == 'New Test Tool'

        response = json.loads(clnt.delete('/api/delete/tool/1').text)
        assert len(db.session.query(Tool).all()) == 0

def test_crud_material(clnt, ctxt):
    with ctxt:
        response = json.loads(clnt.get('/api/read/material/0').text)
        assert len(db.session.query(Material).all()) == 0
        assert response == []

        response = json.loads(clnt.post('/api/create/material', json={'name': 'Test Material'}).text)
        assert len(db.session.query(Material).all()) == 1
        assert db.session.get_one(Material, 1).name == 'Test Material'
        assert response['name'] == 'Test Material'

        response = json.loads(json.loads(clnt.get('/api/read/material/0').text)[0])
        assert response['name'] == 'Test Material'

        response = json.loads(clnt.get('/api/read/material/1').text)
        assert response['name'] == 'Test Material'

        response = json.loads(clnt.patch('/api/update/material/1', json={'name': 'New Test Material'}).text)
        assert db.session.get_one(Material, 1).name == 'New Test Material'
        assert response['name'] == 'New Test Material'

        response = json.loads(clnt.delete('/api/delete/material/1').text)
        assert len(db.session.query(Material).all()) == 0

def test_crud_client(clnt, ctxt):
    with ctxt:
        response = json.loads(clnt.get('/api/read/client/0').text)
        assert len(db.session.query(Client).all()) == 0
        assert response == []

        response = json.loads(clnt.post('/api/create/client', json={'name': 'Test Client', 'email': 'client@email.com', 'phone': '+353 01 234 5678', 'address': '1 Main St, City Center, Dublin, IE'}).text)
        assert len(db.session.query(Client).all()) == 1
        client = db.session.get_one(Client, 1)
        assert client.name == 'Test Client'
        assert client.email == 'client@email.com'
        assert client.phone == '+353 01 234 5678'
        assert client.address == '1 Main St, City Center, Dublin, IE'
        assert response['name'] == 'Test Client'
        assert response['email'] == 'client@email.com'
        assert response['phone'] == '+353 01 234 5678'
        assert response['address'] == '1 Main St, City Center, Dublin, IE'

        response = json.loads(json.loads(clnt.get('/api/read/client/0').text)[0])
        assert response['name'] == 'Test Client'
        assert response['email'] == 'client@email.com'
        assert response['phone'] == '+353 01 234 5678'
        assert response['address'] == '1 Main St, City Center, Dublin, IE'

        response = json.loads(clnt.get('/api/read/client/1').text)
        assert response['name'] == 'Test Client'
        assert response['email'] == 'client@email.com'
        assert response['phone'] == '+353 01 234 5678'
        assert response['address'] == '1 Main St, City Center, Dublin, IE'

        response = json.loads(clnt.patch('/api/update/client/1', json={'name': 'New Test Client', 'email': 'new_client@email.com', 'phone': '+353 01 432 8765', 'address': '2 Back St, City West, Dublin, IE'}).text)
        client = db.session.get_one(Client, 1)
        assert client.name == 'New Test Client'
        assert client.email == 'new_client@email.com'
        assert client.phone == '+353 01 432 8765'
        assert client.address == '2 Back St, City West, Dublin, IE'
        assert response['name'] == 'New Test Client'
        assert response['email'] == 'new_client@email.com'
        assert response['phone'] == '+353 01 432 8765'
        assert response['address'] == '2 Back St, City West, Dublin, IE'

        response = json.loads(clnt.delete('/api/delete/client/1').text)
        assert len(db.session.query(Client).all()) == 0
