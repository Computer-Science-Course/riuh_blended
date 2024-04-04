from marshmallow import Schema, fields

class ViewClientSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(dump_only=True)
    registration = fields.Str(dump_only=True)
    course = fields.Str(dump_only=True)
    active = fields.Bool(dump_only=True)


class CreateClientSchema(Schema):
    name = fields.Str(required=True)
    registration = fields.Str(required=True)
    course = fields.Str(required=True)
    username = fields.Str(required=True)
    active = fields.Bool(required=False)


class UpdateClientSchema(CreateClientSchema):
    active = fields.Bool(required=True)