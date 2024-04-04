from models.db import db

class Employee(db.Model):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    document = db.Column(db.String(128), nullable=False)
    username = db.Column(db.String(32),unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)