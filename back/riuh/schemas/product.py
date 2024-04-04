from marshmallow import Schema, fields

class ViewProductSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(dump_only=True)
    price = fields.Float(dump_only=True)
    quantity = fields.Integer(dump_only=True)
    active = fields.Bool(dump_only=True)


class CreateProductSchema(Schema):
    name = fields.Str(required=True)
    price = fields.Float(required=True)
    quantity = fields.Integer(required=True)
    active = fields.Bool(required=False)


class UpdateProductSchema(CreateProductSchema):
    active = fields.Bool(required=True)