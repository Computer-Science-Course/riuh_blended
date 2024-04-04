from marshmallow import Schema, fields

class ViewPerkSchema(Schema):
    id = fields.Int(dump_only=True)
    employee_id = fields.Int(dump_only=True)
    role_id = fields.Int(dump_only=True)


class CreatePerkSchema(Schema):
    employee_id = fields.Int(required=True)
    role_id = fields.Int(required=True)
