from marshmallow import Schema, fields

class ViewEmployeeSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(dump_only=True)
    document = fields.Str(dump_only=True)
    username = fields.Str(dump_only=True)   


class CreateEmployeeSchema(Schema):
    name = fields.Str(required=True)
    document = fields.Str(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class UpdateEmployeeSchema(Schema):
    name = fields.Str(required=True)
    document = fields.Str(required=True)
    username = fields.Str(required=True)


class LoginEmployeeSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class AccessJWTSchema(Schema):
    access_token = fields.Str(required=True)
