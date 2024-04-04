"""Perk controllers."""

from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)

from schemas.perk import (
    CreatePerkSchema,
    ViewPerkSchema,
)
from schemas.pagination import PaginationSchema
from services import (
    EmployeeService,
)
from services.perk import (
    PerkService,
)

blp = Blueprint('Perk', __name__, description='Opretations on Perks.')

@blp.route('/perk/<int:perk_id>')
class Perk(MethodView):
    """Controllers for specific perk."""

    @jwt_required()
    @blp.response(200, ViewPerkSchema)
    def get(self, perk_id):
        """
        Get a perk by its ID.

        :param int perk_id: Perk ID.

        :return ViewPerkSchema: Perk.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER'},
        )
        service: PerkService = PerkService()
        return service.get_by_id(perk_id)


    @jwt_required(fresh=True)
    @blp.response(200)
    def delete(self, perk_id):
        """
        Delete a perk.

        :param int perk_id: Perk ID.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER'},
        )
        service: PerkService = PerkService()
        return service.delete(perk_id)


@blp.route('/perk')
class PerkGeneral(MethodView):
    """Controllers for general perks."""

    @jwt_required()
    @blp.arguments(PaginationSchema, location='query')
    @blp.response(200, ViewPerkSchema(many=True))
    def get(self, pagination_args):
        """
        Get all perks.

        :return list: List of Perks.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER'},
        )
        service: PerkService = PerkService()
        return service.get_all(**pagination_args)


    @jwt_required(fresh=True)
    @blp.arguments(CreatePerkSchema)
    @blp.response(200, ViewPerkSchema)
    def post(self, perk_data):
        """
        Create a new perk.

        :return ViewOderSchema: Perk to be stored.
        """

        employee_service: EmployeeService = EmployeeService()
        employee_service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER'},
        )
        service: PerkService = PerkService()
        return service.create(**perk_data)
