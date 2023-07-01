"""Product Controller."""

from flask.views import MethodView
from flask_smorest import Blueprint

from schemas.product import (
    CreateProductSchema,
    UpdateProductSchema,
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


    @blp.arguments(UpdateProductSchema)
    @blp.response(200, ViewProductSchema)
    def put(self, product_data, product_id):
        """
        Update an product by its ID.

        :request UpdateProductSchema product_data: Product data to be updated.
        :param int product_id: Product Id.

        :return ViewProductSchema: Product.
        """

        service: ProductService = ProductService()
        return service.update(id=product_id, **product_data)


    @blp.response(204)
    def delete(self, product_id):
        """
        Deactivate a product to indicate they are deleted.

        :param int produt_id: Product ID.
        """

        service: ProductService = ProductService()
        return service.delete(product_id)


    @blp.response(200)
    def patch(self, product_id):
        """
        Activate a product to indicate they are not deleted.

        :param int produt_id: Product ID.
        """

        service: ProductService = ProductService()
        return service.activate(product_id)


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
