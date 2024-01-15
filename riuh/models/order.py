from models.db import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    price = db.Column(db.Float, nullable=False, default=0.0)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    datetime = db.Column(db.DateTime, nullable=True, default=datetime.now)