import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db

class Product(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(50), index=True, unique=True)
    
# class Blueprint(db.Model):
#     id: so.Mapped[int] = so.mapped_column(primary_key=True)
# class BOM(db.Model):
#     id: so.Mapped[int] = so.mapped_column(primary_key=True)

# class WorkOrder(db.Model):
#     id: so.Mapped[int] = so.mapped_column(primary_key=True)
# class BOP(db.Model):
#     id: so.Mapped[int] = so.mapped_column(primary_key=True)
# class Assembly(db.Model):
#     id: so.Mapped[int] = so.mapped_column(primary_key=True)
