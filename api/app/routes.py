from app import app, db
from .models import Product
from markupsafe import escape
from flask import request
import json

def solve_entity(entity):
    if entity in ['bom', 'bop']:
        return str.upper(entity)
    elif entity == 'work-order':
        return ''.join(list(map(lambda x: str.capitalize(x), entity.split('-'))))
    else:
        return str.capitalize(entity)

@app.post('/api/create/<entity>')
def create(entity):
    entity = escape(entity)
    kwargs = request.get_json(force=True)

    # print(request.headers)
    
    # print(kwargs)

    entity = solve_entity(entity)

    # print(*list(kwargs.values()))

    row = globals()[entity]()

    for k in kwargs:
        # print(k)
        # print(kwargs[k])
        setattr(row, k, kwargs[k])

    db.session.add(row)
    db.session.commit()

    # print(vars(row))

    return json.dumps({k: vars(row)[k] for k in vars(row) if k != '_sa_instance_state'})
    # return {'test': 1}

@app.get('/api/read/<entity>/<int:id>')
def read(entity, id):
    entity = escape(entity)
    id = int(escape(id))

    entity = solve_entity(entity)

    if id == 0:
        try:
            rows = db.session.query(globals()[entity]).all()

            # return [{'id': row.id, 'name': row.name} for row in rows]
            return [json.dumps({k: vars(row)[k] for k in vars(row) if k != '_sa_instance_state'}) for row in rows]
        except:
            return []
    
    try:
        row = db.session.get_one(globals()[entity], id)
        # return {'id': row.id, 'name': row.name}
        return json.dumps({k: vars(row)[k] for k in vars(row) if k != '_sa_instance_state'})
    except:
        return {}

@app.patch('/api/update/product/<int:product_id>/<product_name>')
def update_product(product_id, product_name):
    product = db.session.get_one(Product, escape(product_id))
    product.name = escape(product_name)
    db.session.commit()
    return {'id': product.id, 'name': product.name}

@app.delete('/api/delete/product/<int:product_id>')
def delete_product(product_id):
    product = db.session.get_one(Product, escape(product_id))
    db.session.delete(product)
    db.session.commit()
    return {}
