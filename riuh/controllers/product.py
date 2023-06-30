"""Product Controller."""

from flask.views import MethodView
from flask_smorest import Blueprint

from schemas.product import (
    CreateProductSchema,
    ViewProductSchema,
)
from services.product import (
    ProductService,
)

blp = Blueprint('Products', __name__, description='Operations on products.')

@blp.route('/product/<int:product_id>')
class Product(MethodView):
    """Controller for specific product."""

    @blp.response(200, ViewProductSchema)
    def get(self, product_id):
        """
        Get a product by its ID.

        :param int product_id: Product ID.

        :return ViewProductSchema: Product.
        """

        service: ProductService = ProductService()
        return service.get_by_id(product_id)


@blp.route('/product')
class ProductGeneral(MethodView):
    """Controllers for general products."""

    @blp.response(200, ViewProductSchema(many=True))
    def get(self):
        """
        Get all clients.

        :return list: List of Clients.
        """

        service: ProductService = ProductService()
        return service.get_all()


    @blp.arguments(CreateProductSchema)
    @blp.response(201, ViewProductSchema)
    def post(self, product_data):
        """
        Create a product.

        :request CreateProductSchema product_data: Product to be stored.

        :return ViewProductSchema: Product.
        """

        service: ProductService = ProductService()
        return service.create(**product_data)
