from models.db import db

class BlockList(db.Model):
    __tablename__ = 'block_list'

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(256), nullable=False)