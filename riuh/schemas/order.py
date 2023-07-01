from marshmallow import Schema, fields

class ViewOrderSchema(Schema):
    id = fields.Integer(dump_only=True)
    client_id = fields.Integer(dump_only=True)
    employee_id = fields.Integer(dump_only=True)
    product_id = fields.Integer(dump_only=True)
    price = fields.Float(dump_only=True)
    quantity = fields.Int(dump_only=True)
    datetime = fields.DateTime(dump_only=True)


class CreateOrderSchema(Schema):
    client_id = fields.Integer(required=True)
    employee_id = fields.Integer(required=True)
    product_id = fields.Integer(required=True)
    price = fields.Float(required=True)
    quantity = fields.Int(required=True)


class UpdateOrderSchema(CreateOrderSchema):
    ...