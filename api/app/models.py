from datetime import datetime
import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db

class Client(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]
    email: so.Mapped[str]
    phone: so.Mapped[str]
    address: so.Mapped[str]

class Product(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]
    blueprint: so.Mapped[str]

class WorkOrder(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    client: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Client.id))
    start: so.Mapped[datetime]
    end: so.Mapped[datetime]
    cost: so.Mapped[float]

class Product(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]

class Manufacturing(db.Model):
    word_order: so.Mapped[int] = so.mapped_column(sa.ForeignKey(WorkOrder.id), primary_key=True)
    product: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Product.id), primary_key=True)


class Blueprint(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    product: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Product.id))
    document_uri: so.Mapped[str]

class BOM(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    product: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Product.id))

class Material(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]

class Source(db.Model):
    bom: so.Mapped[int] = so.mapped_column(sa.ForeignKey(BOM.id), primary_key=True)
    material: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Material.id), primary_key=True)

class BOP(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    product: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Product.id))

class Process(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]
    description: so.Mapped[str]

class Execute(db.Model):
    bop: so.Mapped[int] = so.mapped_column(sa.ForeignKey(BOP.id), primary_key=True)
    process: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Process.id), primary_key=True)

class Tool(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]

class Use(db.Model):
    process: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Process.id), primary_key=True)
    tool: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Tool.id), primary_key=True)
