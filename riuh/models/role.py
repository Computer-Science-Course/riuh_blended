from models.db import db

class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(32))
    description = db.Column(db.String(128))
    active = db.Column(db.Boolean, nullable=False, default=True)