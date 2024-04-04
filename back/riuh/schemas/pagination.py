from marshmallow import Schema, fields, validate

class PaginationSchema(Schema):
    page = fields.Int(
        required=False,
        missing=1,
        validate=validate.Range(min=1, error="Page number must be a positive integer."),
    )
    per_page = fields.Int(
        required=False,
        missing=10,
        validate=validate.Range(min=1, error="Per_page must be a positive integer."),
    )
