from models.db import db
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.now())
    amount = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(10), nullable=False)
