from models.db import db

class Client(db.Model):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    registration = db.Column(db.String(128), nullable=False)
    username = db.Column(db.String(32), unique=True, nullable=True)
    active = db.Column(db.Boolean, nullable=False, default=True)
