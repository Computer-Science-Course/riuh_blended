from models.db import db

class Wallet(db.Model):
    __tablename__ = 'wallets'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), unique=True)
    balance = db.Column(db.Float, nullable=False, default=0.0)
