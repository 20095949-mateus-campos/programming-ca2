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
    return {'id': product.id, 'name': product.name}

@app.get('/api/read/product/<int:product_id>')
def read_product(product_id):
    if product_id == 0:
        try:
            products = db.session.query(Product).all()
            return [{'id': product.id, 'name': product.name} for product in products]
        except:
            return []
    
    try:
        product = db.session.get_one(Product, escape(product_id))
        return {'id': product.id, 'name': product.name}
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
