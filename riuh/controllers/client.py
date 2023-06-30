"""Client controller."""

from flask.views import MethodView
from flask_smorest import Blueprint

from schemas.client import (
    CreateClientSchema,
    UpdateClientSchema,
    ViewClientSchema,
)
from services import (
    ClientService
)

blp = Blueprint('Clients', __name__, description='Operations on clientes.')

@blp.route('/client/<int:client_id>')
class Client(MethodView):
    """Controllers for specific client."""

    @blp.response(200, ViewClientSchema)
    def get(self, client_id):
        """
        Get a client by ID.

        :param int client_id: Employee ID.

        :return ViewClientSchem: Client.
        """
        service : ClientService = ClientService()
        return service.get_by_id(client_id)


    @blp.arguments(UpdateClientSchema)
    @blp.response(200, ViewClientSchema)
    def put(self, client_data, client_id):
        """
        Update an client by its ID.

        :request UpdateClientSchema client_data: Client data to be updated.
        :param int client_id: Client Id.

        :return ViewClientSchema: Client.
        """

        service: ClientService = ClientService()
        return service.update(id=client_id, **client_data)


    @blp.response(204)
    def delete(self, client_id):
        """
        Deactivate an client to indicate they are deleted.

        :param int client_id: Client ID.
        """

        service: ClientService = ClientService()
        return service.delete(client_id)


    @blp.response(204)
    def patch(self, client_id):
        """
        Activate an client to indicate they are not deleted anymore.

        :param int client_id: Client ID.
        """

        service: ClientService = ClientService()
        return service.activate(client_id)


@blp.route('/client')
class ClientGeneral(MethodView):
    """Controllers for general employees."""

    @blp.response(200, ViewClientSchema(many=True))
    def get(self):
        """
        Get all Clients.

        :return list: List of Clients
        """

        service: ClientService = ClientService()
        return service.get_all()

    @blp.arguments(CreateClientSchema)
    @blp.response(201, ViewClientSchema)
    def post(self, employee_data):
        """
        Create an Client.

        :request CreateClientSchema client_data: Client data to be stored.

        :return ViewEmployeeSchema: Client.
        """

        service: ClientService = ClientService()
        return service.create(**employee_data)

