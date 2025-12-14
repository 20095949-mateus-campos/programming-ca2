# Module Title:         Programming for Information Systems
# Module Code:          B9IS123
# Module Instructor:    Paul Laird
# Assessment Title:     Reactive Web-Based Information System
# Assessment Number:    2
# Assessment Type:      Practical
# Assessment Weighting: 70%
# Assessment Due Date:  Sunday, 14 December 2025, 2:28 PM
# Student Name:         Mateus Fonseca Campos
# Student ID:           20095949
# Student Email:        20095949@mydbs.ie
# GitHub Repo:          https://github.com/20095949-mateus-campos/programming-ca2

# This file was originally sourced from Miguel Grinberg's blog.
# Link: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database.
# Changes have been commented where applicable.

# Flask-SQLAlchemy Docs referenced: https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/#define-models.

from datetime import datetime  # imported module to handle date datatype
import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db

# Client model created to map to Client database entity
# Strong entity; no dependencies
class Client(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]
    email: so.Mapped[str]
    phone: so.Mapped[str]
    address: so.Mapped[str]

# Product model created to map to Product database entity
# Strong entity; no dependencies
class Product(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]
    blueprint: so.Mapped[str]

# WorkOrder model created to map to WorkOrder database entity
# Weak entity; depends on Client and Product
class WorkOrder(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    client: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Client.id))
    product: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Product.id))
    start: so.Mapped[datetime]
    end: so.Mapped[datetime]
    cost: so.Mapped[float]

# Material model created to map to Material database entity
# Strong entity; no dependencies
class Material(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]

# Bill of Materials model created to map to Bill of Materials database entity
# Associative entity; links Product to Material
class BOM(db.Model):
    product: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Product.id), primary_key=True)
    material: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Material.id), primary_key=True)

# Process model created to map to Process database entity
# Strong entity; no dependencies
class Process(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]
    description: so.Mapped[str]

# Bill of Processes model created to map to Bill of Processes database entity
# Associative entity; links Product to Process
class BOP(db.Model):
    product: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Product.id), primary_key=True)
    process: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Process.id), primary_key=True)

# Tool model created to map to Tool database entity
# Strong entity; no dependencies
class Tool(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str]

# Use model created to map to Use database entity
# Associative entity; links Process to Tool
class Use(db.Model):
    process: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Process.id), primary_key=True)
    tool: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Tool.id), primary_key=True)
