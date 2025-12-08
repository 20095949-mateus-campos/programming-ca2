# Flask Docs referenced: https://flask.palletsprojects.com/en/stable/quickstart/#routing.
# Flask-SQLAlchemy Docs referenced: https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/#query-the-data.

from app import app, db
from .models import *
from markupsafe import escape
from flask import request, Blueprint
import json
from sqlalchemy.sql.sqltypes import DateTime

# creates blueprint for app's routes
blueprint = Blueprint('blueprint', __name__)

# this function capitalizes the entity name following:
#   'bom' -> 'BOM'
#   'bop' -> 'BOP'
#   'workorder' -> 'WorkOrder'
#   anything else, capitalize just the first letter, ex.: 'product' -> 'Product'
def solve_entity(entity):
    if entity in ['bom', 'bop']:
        return str.upper(entity)
    elif entity == 'workorder':
        return ''.join(list(map(lambda x: str.capitalize(x), [entity[:4], entity[4:]])))
    else:
        return str.capitalize(entity)

# this function handles POST requets at the specified endpoint
# database CREATE operation (from CRUD)
@blueprint.post('/api/create/<entity>')
def create(entity, **kwargs):
    entity = escape(entity)
    post = request.get_json(force=True)  # force=True to ignore MIME type

    # create with kwargs is a recursive call to create associative models when needed:
    #   e_1: entity 1
    #   e_2: entity 2
    #   i_i: entity 1's ID
    #   i_2: entity 2's ID
    if len(kwargs) != 0:
        row = globals()[entity]()
        setattr(row, kwargs['e_1'], kwargs['i_1'])
        setattr(row, kwargs['e_2'], kwargs['i_2'])
        db.session.add(row)
        db.session.commit()
        return {}

    entity = solve_entity(entity)  # capitalize entity name
    row = globals()[entity]()  # instantiate model

    # set model attributes to JSON contents
    for k in post:
        if k in row.__annotations__:  # make sure that content maps to an attribute
            try:  # tries to convert date string to datetime object
                if type(dict(row.metadata.tables[str.lower(entity)].c)[k].type) is DateTime:
                    post[k] = datetime.strptime(post[k], '%Y-%m-%d').date()
            except Exception as e:  # exception needed, 'work_order' != from 'workorder'
                if type(e) is KeyError:
                    if type(dict(row.metadata.tables['_'.join([str.lower(entity)[:4], str.lower(entity)[4:]])].c)[k].type) is DateTime:
                        post[k] = datetime.strptime(post[k], '%Y-%m-%d').date()
            setattr(row, k, post[k])
    
    # add to database
    db.session.add(row)
    db.session.commit()

    # create associative models from JSON contents, where:
    #   Entity 1 -> Relationship -> Entity 2, ex.: Process -> Use -> Tool
    #   relation: associative entity's name
    #   e_1: entity 1's name
    #   e_2: entity 2's name
    #   i_i: entity 1's ID
    #   i_2: entity 2's ID
    for k in post:
        if k not in row.__annotations__:  # make sure that content does not map to an attribute
            relation = list(post[k].keys())[0]
            id_2 = json.loads(read(k, post[k][relation]))['id']
            create(relation, e_1=str.lower(entity), i_1=row.id, e_2=str.lower(k), i_2=id_2)  # recursive call with kwargs

    # returns model as JSON excluding reference to instance state (only attributes)
    # return json.dumps({k: vars(row)[k] for k in vars(row) if k != '_sa_instance_state'})
    return read(entity, row.id)

# this function handles GET requets at the specified endpoint
# database READ operation (from CRUD)
@blueprint.get('/api/read/<entity>/<int:id>')
def read(entity, id=0):
    entity = escape(entity)
    id = int(escape(id))  # ID of model to be read

    entity = solve_entity(entity)  # capitalize entity name

    # if ID is 0 then get all models, else get specific model
    if id == 0:
        try:  # tries to read all models
            rows = db.session.query(globals()[entity]).all()  # instantiate models

            # returns list of models as JSON excluding reference to instance state (only attributes)
            return json.dumps([{k: vars(row)[k] for k in vars(row) if k != '_sa_instance_state'} for row in rows])
        except Exception as e:  # exception needed, 'work_order' != form 'workorder'
            if type(e) is TypeError:
                json_dumps = []
                json_dump = {}

                # datetime objects need to be converted to date strings
                for row in rows:
                    for k in vars(row):
                        if k == '_sa_instance_state':
                            continue
                        if type(getattr(row, k)) is datetime:
                            setattr(row, k, getattr(row, k).strftime('%Y-%m-%d'))
                        json_dump[k] = vars(row)[k]
                    json_dumps.append(json.dumps(json_dump))
                    json_dump = {}

                # return list of models
                return json_dumps
            else:
                return []

    try:  # tries to read model
        row = db.session.get_one(globals()[entity], id)  # instantiate model

        # read from associative tables also if applicable
        if entity == 'Product':
            row.__setattr__('material', db.session.execute(db.select(BOM).filter_by(product=row.id)).scalar_one().material)
            row.__setattr__('process', db.session.execute(db.select(BOP).filter_by(product=row.id)).scalar_one().process)
        elif entity == 'Process':
            row.__setattr__('tool', db.session.execute(db.select(Use).filter_by(process=row.id)).scalar_one().tool)
        
        # returns model as JSON excluding reference to instance state (only attributes)
        return json.dumps({k: vars(row)[k] for k in vars(row) if k != '_sa_instance_state'})
    except Exception as e:  # exception needed, 'work_order' != form 'workorder'
        if type(e) is TypeError:
            json_dump = {}

            # datetime objects need to be converted to date strings
            for k in vars(row):
                if k == '_sa_instance_state':
                    continue
                if type(getattr(row, k)) is datetime:
                    setattr(row, k, getattr(row, k).strftime('%Y-%m-%d'))
                json_dump[k] = vars(row)[k]

            # return model
            return json.dumps(json_dump)
        else:
            return {}

# this function handles PATCH requets at the specified endpoint
# database UPDATE operation (from CRUD)
@blueprint.patch('/api/update/<entity>/<int:id>')
def update(entity, id):
    entity = escape(entity)
    id = int(escape(id))  # ID of model to be updated
    req = request.get_json(force=True)  # force=True to ignore MIME type
    
    entity = solve_entity(entity)  # capitalize entity name
    row = db.session.get_one(globals()[entity], id)  # instantiate model

    # set updated attributes to JSON contents
    for k in req:
        setattr(row, k, req[k])
    
    # update to database
    db.session.commit()

    # return model details
    return read(entity, id)

# this function handles DELETE requets at the specified endpoint
# database DELETE operation (from CRUD)
@blueprint.delete('/api/delete/<entity>/<int:id>')
def delete(entity, id):
    entity = escape(entity)
    id = int(escape(id))  # ID of model to be deleted
    
    entity = solve_entity(entity)  # capitalize entity name
    row = db.session.get_one(globals()[entity], id)  # instantiate model

    # delete from database
    db.session.delete(row)
    db.session.commit()

    # return list of models
    return read(entity)

app.register_blueprint(blueprint)
