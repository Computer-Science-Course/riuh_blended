"""Client controller."""

from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)

from schemas.client import (
    CreateClientSchema,
    UpdateClientSchema,
    ViewClientSchema,
)
from schemas.pagination import PaginationSchema
from services import (
    ClientService
)
from services import (
    EmployeeService,
)

blp = Blueprint('Clients', __name__, description='Operations on clientes.')

@blp.route('/client/<string:client_id>')
class Client(MethodView):
    """Controllers for specific client."""

    @jwt_required()
    @blp.response(200, ViewClientSchema)
    def get(self, client_id):
        """
        Get a client by document.

        :param int client_id: Employee ID.

        :return ViewClientSchem: Client.
        """
        service : ClientService = ClientService()
        return service.get_by_registration(client_id)


    @jwt_required()
    @blp.arguments(UpdateClientSchema)
    @blp.response(200, ViewClientSchema)
    def put(self, client_data, client_id):
        """
        Update an client by its ID.

        :request UpdateClientSchema client_data: Client data to be updated.
        :param int client_id: Client Id.

        :return ViewClientSchema: Client.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        service: ClientService = ClientService()
        return service.update(id=client_id, **client_data)


    @jwt_required(fresh=True)
    @blp.response(204)
    def delete(self, client_id):
        """
        Deactivate an client to indicate they are deleted.

        :param int client_id: Client ID.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        service: ClientService = ClientService()
        return service.delete(client_id)


    @jwt_required()
    @blp.response(204)
    def patch(self, client_id):
        """
        Activate an client to indicate they are not deleted anymore.

        :param int client_id: Client ID.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        service: ClientService = ClientService()
        return service.activate(client_id)


@blp.route('/client')
class ClientGeneral(MethodView):
    """Controllers for general employees."""

    @jwt_required()
    @blp.arguments(PaginationSchema, location='query')
    @blp.response(200, ViewClientSchema(many=True))
    def get(self, pagination_args):
        """
        Get all Clients.

        :return list: List of Clients
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        service: ClientService = ClientService()
        return service.get_all(**pagination_args)


    @jwt_required()
    @blp.arguments(CreateClientSchema)
    @blp.response(201, ViewClientSchema)
    def post(self, employee_data):
        """
        Create an Client.

        :request CreateClientSchema client_data: Client data to be stored.

        :return ViewEmployeeSchema: Client.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        service: ClientService = ClientService()
        return service.create(**employee_data)

