"""Employee Controllers."""

from flask.views import MethodView
from flask_smorest import (
    abort,
    Blueprint,
)
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    get_jwt,
    jwt_required,
)
from passlib.hash import pbkdf2_sha256 as sha256

from schemas.employee import (
    AccessJWTSchema,
    CreateEmployeeSchema,
    LoginEmployeeSchema,
    LogoutEmployeeSchema,
    ViewEmployeeSchema,
    UpdateEmployeeSchema
)
from schemas.pagination import PaginationSchema
from services import (
    BlockListService,
    EmployeeService,
)

blp = Blueprint('Employees', __name__, description='Operations on employees.')

@blp.route('/employee/<int:employee_id>')
class Employee(MethodView):
    """Controllers for specific employee."""

    @jwt_required()
    @blp.response(200, ViewEmployeeSchema)
    def get(self, employee_id):
        """
        Get an employee by ID.

        :param int employee_id: Employee ID.

        :return ViewEmployeeSchema: Employee.
        """

        service: EmployeeService = EmployeeService()
        service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        return service.get_by_id(employee_id)


    @jwt_required()
    @blp.arguments(UpdateEmployeeSchema)
    @blp.response(200, ViewEmployeeSchema)
    def put(self, employee_data, employee_id):
        """
        Update an employee by its ID.

        :request UpdateEmployeeSchema employee_data: Employee data to be updated.
        :param int employee_id: Employee ID.

        :return ViewEmployeeSchema: Employee.
        """

        service: EmployeeService = EmployeeService()
        service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER'},
        )
        return service.update(id=employee_id, **employee_data)


    @jwt_required()
    @blp.response(204)
    def delete(self, employee_id):
        """
        Deactivate an employee to indicate they are deleted.

        :param int employee_id: Employee ID.
        """

        service: EmployeeService = EmployeeService()
        service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER'},
        )
        service.delete(employee_id)


    @jwt_required()
    @blp.response(200)
    def patch(self, employee_id):
        """
        Activate an employee to indicate they are not deleted anymore.

        :param int employee_id: Employee ID.
        """

        service: EmployeeService = EmployeeService()
        service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER'},
        )
        service.activate(employee_id)


@blp.route('/employee')
class EmployeeGeneral(MethodView):
    """Controllers for general employees."""

    @jwt_required()
    @blp.arguments(PaginationSchema, location='query')
    @blp.response(200, ViewEmployeeSchema(many=True))
    def get(self, pagination_args):
        """
        Get all employees.

        :return list: List of Employees.
        """

        service: EmployeeService = EmployeeService()
        service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER'},
        )
        return service.get_all(**pagination_args)


    @jwt_required()
    @blp.arguments(CreateEmployeeSchema)
    @blp.response(201, ViewEmployeeSchema)
    def post(self, employee_data):
        """
        Create a new employee on database.

        :request CreateEmployeeSchema employee_data: Employee data to be stored.

        :return ViewEmployeeSchema: Employee.
        """

        service: EmployeeService = EmployeeService()
        service.has_privilege(
            employee_id=get_jwt_identity(),
            required_privilege={'ADMIN', 'MANAGER'},
        )
        return service.create(**employee_data)


@blp.route('/employee/self')
class SelfEmployee(MethodView):
    """Controllers for self employee based on jwt identity."""

    @jwt_required()
    @blp.response(200, ViewEmployeeSchema)
    def get(self):
        """
        Get self employee informationa.

        :return ViewEmployeeSchema: Employee.
        """

        employee_id = get_jwt_identity()
        service: EmployeeService = EmployeeService()
        service.has_privilege(
            employee_id=employee_id,
            required_privilege={'ADMIN', 'MANAGER', 'EMPLOYEE'},
        )
        return service.get_by_id(employee_id)


@blp.route('/login')
class EmployeeLogin(MethodView):
    """Controllers for employee login."""

    @blp.arguments(LoginEmployeeSchema)
    @blp.response(200, AccessJWTSchema)
    def post(self, employee_data):
        """
        Login an employee.

        :request LoginEmployeeSchema employee_data: Employee data to be used for login.

        :return str: Access token.
        """

        service: EmployeeService = EmployeeService()
        employee = service.get_by_username(employee_data.get('username'))

        if employee and sha256.verify(employee_data.get('password'), employee.password):
            access_token = create_access_token(identity=employee.id, fresh=True)
            refresh_token = create_refresh_token(identity=employee.id)
            return {'access_token': access_token, 'refresh_token': refresh_token}

        abort(401, message='Invalid username or password.')


@blp.route('/refresh')
class EmployeeRefresh(MethodView):
    """Controllers for employee refresh."""

    @jwt_required(refresh=True)
    @blp.response(200, AccessJWTSchema)
    def post(self):
        """
        Refresh an employee's access token.

        :return AccessJWTSchema: Access token.
        """

        employee_id = get_jwt_identity()
        access_token = create_access_token(identity=employee_id, fresh=False)
        refresh_token = create_refresh_token(identity=employee_id)

        return {'access_token': access_token, 'refresh_token': refresh_token}


@blp.route('/logout')
class EmployeeLogout(MethodView):
    """Controllers for employee logout."""

    @jwt_required()
    @blp.response(200, LogoutEmployeeSchema)
    def post(self):
        """
        Logout an employee.

        :return str: Message indicating successful logout.
        """

        jti = get_jwt()['jti']
        block_list_service: BlockListService = BlockListService()
        block_list_service.create(jti)
        return {'message': 'Successfully logged out.'}
