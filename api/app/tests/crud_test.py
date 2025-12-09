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

# test function for CRUD operations for the WorkOrder entity
def test_crud_workorder(clnt, ctxt):
    old_model = {'client': 1, 'product': 1, 'start': '2025-10-10', 'end': '2025-11-10', 'cost': 500.00}
    new_model = {'client': 2, 'product': 2, 'start': '2026-11-25', 'end': '2026-12-25', 'cost': 1000.00}

    # Satisfy foreign keys
    db.session.add(Client(name='any', email='any', phone='any', address='any'))
    db.session.add(Client(name='any', email='any', phone='any', address='any'))
    db.session.add(Product(name='any', blueprint='any'))
    db.session.add(Product(name='any', blueprint='any'))
    db.session.commit()

    with ctxt:
        # Read all when none
        response = json.loads(clnt.get('/api/read/workorder/0').text)
        assert len(db.session.query(WorkOrder).all()) == 0
        assert response == []

        # Read one when none
        response = json.loads(clnt.get('/api/read/workorder/1').text)
        assert response == {}
        
        # Create one
        response = json.loads(clnt.post('/api/create/workorder', json=old_model).text)
        assert len(db.session.query(WorkOrder).all()) == 1
        model = db.session.get_one(WorkOrder, 1)
        assert model.client == old_model['client']
        assert model.product == old_model['product']
        assert model.start == datetime.strptime(old_model['start'], '%Y-%m-%d')
        assert model.end == datetime.strptime(old_model['end'], '%Y-%m-%d')
        assert model.cost == old_model['cost']
        assert response['client'] == old_model['client']
        assert response['product'] == old_model['product']
        assert response['start'] == old_model['start']
        assert response['end'] == old_model['end']
        assert response['cost'] == old_model['cost']

        # Read all
        response = json.loads(clnt.get('/api/read/workorder/0').text)
        assert len(db.session.query(WorkOrder).all()) == 1
        assert response[0]['client'] == old_model['client']
        assert response[0]['product'] == old_model['product']
        assert response[0]['start'] == old_model['start']
        assert response[0]['end'] == old_model['end']
        assert response[0]['cost'] == old_model['cost']

        # Read one
        response = json.loads(clnt.get('/api/read/workorder/1').text)
        assert response['client'] == old_model['client']
        assert response['product'] == old_model['product']
        assert response['start'] == old_model['start']
        assert response['end'] == old_model['end']
        assert response['cost'] == old_model['cost']

        # Update one
        response = json.loads(clnt.patch('/api/update/workorder/1', json=new_model).text)
        model = db.session.get_one(WorkOrder, 1)
        assert model.client == new_model['client']
        assert model.product == new_model['product']
        assert model.start == datetime.strptime(new_model['start'], '%Y-%m-%d')
        assert model.end == datetime.strptime(new_model['end'], '%Y-%m-%d')
        assert model.cost == new_model['cost']
        assert response['client'] == new_model['client']
        assert response['product'] == new_model['product']
        assert response['start'] == new_model['start']
        assert response['end'] == new_model['end']
        assert response['cost'] == new_model['cost']

        # Delete one
        response = json.loads(clnt.delete('/api/delete/workorder/1').text)
        assert len(db.session.query(WorkOrder).all()) == 0

# test function for CRUD operations for the Process entity
def test_crud_process(clnt, ctxt):
    old_model = {'name': 'Test Process', 'description': 'Test process description', 'tool': {'Use': 1}}
    new_model = {'name': 'New Test Process', 'description': 'New test process description', 'tool': {'Use': 2}}

    # Satisfy foreign keys
    db.session.add(Tool(name='any'))
    db.session.add(Tool(name='any'))
    db.session.commit()

    with ctxt:
        # Read all when none
        response = json.loads(clnt.get('/api/read/process/0').text)
        assert len(db.session.query(Process).all()) == 0
        assert response == []

        # Read one when none
        response = json.loads(clnt.get('/api/read/process/1').text)
        assert response == {}
        
        # Create one
        response = json.loads(clnt.post('/api/create/process', json=old_model).text)
        assert len(db.session.query(Process).all()) == 1
        model = db.session.get_one(Process, 1)
        assert model.name == old_model['name']
        assert model.description == old_model['description']
        assert db.session.execute(db.select(Use).filter_by(process=model.id)).scalar_one().tool == old_model['tool']['Use']
        assert response['name'] == old_model['name']
        assert response['description'] == old_model['description']
        assert response['tool'] == old_model['tool']['Use']

        # Read all
        response = json.loads(clnt.get('/api/read/process/0').text)
        assert len(db.session.query(Process).all()) == 1
        assert response[0]['name'] == old_model['name']
        assert response[0]['description'] == old_model['description']

        # Read one
        response = json.loads(clnt.get('/api/read/process/1').text)
        assert response['name'] == old_model['name']
        assert response['description'] == old_model['description']
        assert response['tool'] == old_model['tool']['Use']

        # Update one
        response = json.loads(clnt.patch('/api/update/process/1', json=new_model).text)
        model = db.session.get_one(Process, 1)
        assert model.name == new_model['name']
        assert model.description == new_model['description']
        assert db.session.execute(db.select(Use).filter_by(process=model.id)).scalar_one().tool == new_model['tool']['Use']
        assert response['name'] == new_model['name']
        assert response['description'] == new_model['description']
        assert response['tool'] == new_model['tool']['Use']

        # Delete one
        response = json.loads(clnt.delete('/api/delete/process/1').text)
        assert len(db.session.query(Process).all()) == 0

# test function for CRUD operations for the Product entity
def test_crud_product(clnt, ctxt):
    old_model = {'name': 'Test Product', 'blueprint': 'image-uri', 'process': {'BOP': 1}, 'material': {'BOM': 1}}
    new_model = {'name': 'New Test Product', 'blueprint': 'new-image-uri', 'process': {'BOP': 2}, 'material': {'BOM': 2}}

    # Satisfy foreign keys
    db.session.add(Process(name='any', description='any'))
    db.session.add(Process(name='any', description='any'))
    db.session.add(Tool(name='any'))
    db.session.add(Use(process=1, tool=1))
    db.session.add(Use(process=2, tool=1))
    db.session.add(Material(name='any'))
    db.session.add(Material(name='any'))
    db.session.commit()

    with ctxt:
        # Read all when none
        response = json.loads(clnt.get('/api/read/product/0').text)
        assert len(db.session.query(Product).all()) == 0
        assert response == []

        # Read one when none
        response = json.loads(clnt.get('/api/read/product/1').text)
        assert response == {}
        
        # Create one
        response = json.loads(clnt.post('/api/create/product', json=old_model).text)
        assert len(db.session.query(Product).all()) == 1
        model = db.session.get_one(Product, 1)
        assert model.name == old_model['name']
        assert model.blueprint == old_model['blueprint']
        assert db.session.execute(db.select(BOP).filter_by(product=model.id)).scalar_one().process == old_model['process']['BOP']
        assert db.session.execute(db.select(BOM).filter_by(product=model.id)).scalar_one().material == old_model['material']['BOM']
        assert response['name'] == old_model['name']
        assert response['blueprint'] == old_model['blueprint']
        assert response['process'] == old_model['process']['BOP']
        assert response['material'] == old_model['material']['BOM']

        # Read all
        response = json.loads(clnt.get('/api/read/product/0').text)
        assert len(db.session.query(Product).all()) == 1
        assert response[0]['name'] == old_model['name']
        assert response[0]['blueprint'] == old_model['blueprint']

        # Read one
        response = json.loads(clnt.get('/api/read/product/1').text)
        assert response['name'] == old_model['name']
        assert response['blueprint'] == old_model['blueprint']
        assert response['process'] == old_model['process']['BOP']
        assert response['material'] == old_model['material']['BOM']

        # Update one
        response = json.loads(clnt.patch('/api/update/product/1', json=new_model).text)
        model = db.session.get_one(Product, 1)
        assert model.name == new_model['name']
        assert model.blueprint == new_model['blueprint']
        assert db.session.execute(db.select(BOP).filter_by(product=model.id)).scalar_one().process == new_model['process']['BOP']
        assert db.session.execute(db.select(BOM).filter_by(product=model.id)).scalar_one().material == new_model['material']['BOM']
        assert response['name'] == new_model['name']
        assert response['blueprint'] == new_model['blueprint']
        assert response['process'] == new_model['process']['BOP']
        assert response['material'] == new_model['material']['BOM']

        # Delete one
        response = json.loads(clnt.delete('/api/delete/product/1').text)
        assert len(db.session.query(Product).all()) == 0
