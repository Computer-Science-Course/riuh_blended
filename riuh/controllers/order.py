"""Order controllers."""

from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)

from schemas.order import (
    CreateOrderSchema,
    UpdateOrderSchema,
    ViewOrderSchema,
)
from schemas.pagination import PaginationSchema
from services import (
    EmployeeService,
)
from services.order import (
    OrderService,
)

blp = Blueprint('Order', __name__, description='Opretations on Orders.')

@blp.route('/order/<int:order_id>')
class Order(MethodView):
    """Controllers for specific order."""

    @jwt_required()
    @blp.response(200, ViewOrderSchema)
    def get(self, order_id):
        """
        Get an order by its ID.

        :param int order_id: Order ID.

        :return ViewOrderSchema: Order.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        service: OrderService = OrderService()
        return service.get_by_id(order_id)

    @jwt_required()
    @blp.arguments(UpdateOrderSchema)
    @blp.response(200, ViewOrderSchema)
    def put(self, order_data, order_id):
        """
        Update an order.

        :request UpdateOrderSchema order_data: Order to be updated.
        :param int order_id: Order ID.

        :return ViewOrderSchema: Order.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        service: OrderService = OrderService()
        return service.update(id=order_id, **order_data)


    @jwt_required()
    @blp.response(200)
    def delete(self, order_id):
        """
        Delete a order.

        :param int order_id: Order ID.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        service: OrderService = OrderService()
        return service.delete(order_id)


@blp.route('/order')
class OrderGeneral(MethodView):
    """Controllers for general orders."""

    @jwt_required()
    @blp.arguments(PaginationSchema, location='query')
    @blp.response(200, ViewOrderSchema(many=True))
    def get(self, pagination_args):
        """
        Get all orders.

        :return list: List of Orders.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        service: OrderService = OrderService()
        return service.get_all(**pagination_args)


    @jwt_required()
    @blp.arguments(CreateOrderSchema)
    @blp.response(200, ViewOrderSchema)
    def post(self, order_data):
        """
        Create a new order.

        :return ViewOderSchema: Order to be stored.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        service: OrderService = OrderService()
        return service.create(**order_data)
