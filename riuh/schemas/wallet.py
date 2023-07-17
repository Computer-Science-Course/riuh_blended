from marshmallow import fields, Schema

class ViewWalletSchema(Schema):
    id = fields.Int(dump_only=True)
    client_id = fields.Int(dump_only=True)
    balance = fields.Float(dump_only=True)


class CreateWalletSchema(Schema):
    client_id = fields.Int(required=True)
    balance = fields.Float(required=False)


class UpdateWalletSchema(Schema):
    balance = fields.Float(required=False)
