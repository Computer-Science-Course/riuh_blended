from marshmallow import Schema, fields

class ViewRoleSchema(Schema):
    id = fields.Int(dump_only=True)
    label = fields.Str(dump_only=True)
    description = fields.Str(dump_only=True)
    active = fields.Bool(dump_only=True)


class CreateRoleSchema(Schema):
    label = fields.Str(required=True)
    description = fields.Str(required=True)
    active = fields.Bool(required=False)


class UpdateRoleSchema(CreateRoleSchema):
    pass
