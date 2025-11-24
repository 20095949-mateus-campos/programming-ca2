from app import app, db
from .models import Product
from markupsafe import escape

@app.post('/api/create/product/<product_name>')
def create_product(product_name):
    product = Product(name=escape(product_name))
    db.session.add(product)
    db.session.commit()
    return {'id': product.id, 'name': product.name}

@app.get('/api/read/product/<int:product_id>')
def read_product(product_id):
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
