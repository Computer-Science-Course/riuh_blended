"""Role controllers."""

from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import (
    jwt_required,
)

from schemas.role import (
    CreateRoleSchema,
    ViewRoleSchema,
    UpdateRoleSchema,
)
from services.role import (
    RoleService,
)

blp = Blueprint('Role', __name__, description='Opretations on Roles.')

@blp.route('/role/<int:role_id>')
class Role(MethodView):
    """Controllers for specific role."""

    @jwt_required()
    @blp.response(200, ViewRoleSchema)
    def get(self, role_id):
        """
        Get a role by its ID.

        :param int role_id: Role ID.

        :return ViewRoleSchema: Role.
        """

        service: RoleService = RoleService()
        return service.get_by_id(role_id)

    @jwt_required()
    @blp.arguments(UpdateRoleSchema)
    @blp.response(200, ViewRoleSchema)
    def put(self, role_data, role_id):
        """
        Update a role.

        :request UpdateRoleSchema role_data: Role to be updated.
        :param int role_id: Role ID.

        :return ViewRoleSchema: Role.
        """

        service: RoleService = RoleService()
        return service.update(id=role_id, **role_data)


    @jwt_required()
    @blp.response(200)
    def delete(self, role_id):
        """
        Deactivate a role to indicate they are deleted.

        :param int role_id: Role ID.
        """

        service: RoleService = RoleService()
        return service.delete(role_id)

    @jwt_required()
    @blp.response(204)
    def patch(self, role_id):
        """
        Activate a role to indicate they are not deleted anymore.

        :param int role_id: Role ID.
        """

        service: RoleService = RoleService()
        return service.activate(role_id)


@blp.route('/role')
class RoleGeneral(MethodView):
    """Controllers for general roles."""

    @jwt_required()
    @blp.response(200, ViewRoleSchema(many=True))
    def get(self):
        """
        Get all roles.

        :return list: List of Roles.
        """

        service: RoleService = RoleService()
        return service.get_all()

    @jwt_required()
    @blp.arguments(CreateRoleSchema)
    @blp.response(200, ViewRoleSchema)
    def post(self, role_data):
        """
        Create a new role.

        :return ViewOderSchema: Role to be stored.
        """

        service: RoleService = RoleService()
        return service.create(**role_data)
