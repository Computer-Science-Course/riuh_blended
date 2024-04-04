from marshmallow import Schema, fields

from schemas.validators.transaction import validate_transaction_type

class ViewTransactionSchema(Schema):
    id = fields.Int(dump_only=True)
    client_id = fields.Int(dump_only=True)
    employee_id = fields.Int(dump_only=True)
    datetime = fields.DateTime(dump_only=True)
    amount = fields.Float(dump_only=True)
    transaction_type = fields.Str(dump_only=True)


class CreateTransactionSchema(Schema):
    client_id = fields.Int(required=True)
    employee_id = fields.Int(required=True)
    amount = fields.Float(required=True)
    transaction_type = fields.Str(required=True, validate=validate_transaction_type)


class UpdateTransactionSchema(CreateTransactionSchema):
    pass

