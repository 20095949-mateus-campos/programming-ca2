from app import app, db
from .models import *
from markupsafe import escape
from flask import request
import json
from sqlalchemy.sql.sqltypes import DateTime

def solve_entity(entity):
    if entity in ['bom', 'bop']:
        return str.upper(entity)
    elif entity == 'workorder':
        return ''.join(list(map(lambda x: str.capitalize(x), [entity[:4], entity[4:]])))
    else:
        return str.capitalize(entity)

@app.post('/api/create/<entity>')
def create(entity, **kwargs):
    entity = escape(entity)
    post = request.get_json(force=True)


    print("HERE NOW")
    print(post)
    print(kwargs)

    if len(kwargs) != 0:
        row = globals()[entity]()
        setattr(row, kwargs['e_1'], kwargs['i_1'])
        setattr(row, kwargs['e_2'], kwargs['i_2'])
        db.session.add(row)
        db.session.commit()
        return {}

    # print(request.headers)
    
    # print(post)

    entity = solve_entity(entity)

    # print(*list(post.values()))

    row = globals()[entity]()

    for k in post:
        print(k)
        print(post[k])
        print(vars(row))
        if k in row.__annotations__:
            try:
                if type(dict(row.metadata.tables[str.lower(entity)].c)[k].type) is DateTime:
                    post[k] = datetime.strptime(post[k], '%Y-%m-%d').date()
            except Exception as e:
                if type(e) is KeyError:
                    if type(dict(row.metadata.tables['_'.join([str.lower(entity)[:4], str.lower(entity)[4:]])].c)[k].type) is DateTime:
                        post[k] = datetime.strptime(post[k], '%Y-%m-%d').date()
            
            setattr(row, k, post[k])

    print(vars(row))

    db.session.add(row)
    db.session.commit()

    for k in post:
        # print(k)
        # print(post[k])
        if k not in row.__annotations__:
            print("HERE:")
            print(k)
            relation = list(post[k].keys())[0]

            print(relation)
            print(type(json.loads(read(k, post[k][relation]))))


            id_2 = json.loads(read(k, post[k][relation]))['id']



            create(relation, e_1=str.lower(entity), i_1=row.id, e_2=str.lower(k), i_2=id_2)

    # print(vars(row))

    return json.dumps({k: vars(row)[k] for k in vars(row) if k != '_sa_instance_state'})
    # return {'test': 1}

@app.get('/api/read/<entity>/<int:id>')
def read(entity, id=0):
    entity = escape(entity)
    id = int(escape(id))

    entity = solve_entity(entity)

    if id == 0:
        try:
            rows = db.session.query(globals()[entity]).all()

            return [json.dumps({k: vars(row)[k] for k in vars(row) if k != '_sa_instance_state'}) for row in rows]
        except Exception as e:
            if type(e) is TypeError:
                json_dumps = []
                json_dump = {}
                for row in rows:
                    for k in vars(row):
                        if k == '_sa_instance_state':
                            continue
                        if type(getattr(row, k)) is datetime:
                            setattr(row, k, getattr(row, k).strftime('%Y-%m-%d'))
                        json_dump[k] = vars(row)[k]
                    json_dumps.append(json.dumps(json_dump))
                    json_dump = {}

                return json_dumps
            else:
                return []


    try:
        row = db.session.get_one(globals()[entity], id)

        if entity == 'Product':
            row.__setattr__('material', db.session.execute(db.select(BOM).filter_by(product=row.id)).scalar_one().material)
            row.__setattr__('process', db.session.execute(db.select(BOP).filter_by(product=row.id)).scalar_one().process)
        
        return json.dumps({k: vars(row)[k] for k in vars(row) if k != '_sa_instance_state'})
    except Exception as e:
        if type(e) is TypeError:
            json_dump = {}
            for k in vars(row):
                if k == '_sa_instance_state':
                    continue
                if type(getattr(row, k)) is datetime:
                    setattr(row, k, getattr(row, k).strftime('%Y-%m-%d'))
                json_dump[k] = vars(row)[k]

            return json.dumps(json_dump)
        else:
            return {}

@app.patch('/api/update/<entity>/<int:id>')
def update(entity, id):
    entity = escape(entity)
    id = int(escape(id))
    kwargs = request.get_json(force=True)
    
    entity = solve_entity(entity)

    row = db.session.get_one(globals()[entity], id)

    for k in kwargs:
        # print(k)
        # print(kwargs[k])
        setattr(row, k, kwargs[k])
    
    db.session.commit()

    return read(entity, id)

@app.delete('/api/delete/<entity>/<int:id>')
def delete(entity, id):
    entity = escape(entity)
    id = int(escape(id))
    
    entity = solve_entity(entity)

    row = db.session.get_one(globals()[entity], id)
    db.session.delete(row)
    db.session.commit()
    return read(entity)
