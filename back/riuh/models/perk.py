from models.db import db

class Perk(db.Model):
    __tablename__ = 'perks'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))