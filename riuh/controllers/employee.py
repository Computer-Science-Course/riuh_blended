"""Employee Controller"""

from flask.views import MethodView
from flask_smorest import Blueprint

from schemas.employee import (
    CreateEmployeeSchema,
    ViewEmployeeSchema,
    UpdateEmployeeSchema
)
from services import (
    EmployeeService,
)

blp = Blueprint('employees', __name__, description = 'Operations on employees.')

@blp.route('/employee/<int:employee_id>')
class Employee(MethodView):
    """Controllers for specific employee"""

    @blp.response(200, ViewEmployeeSchema)
    def get(self, employee_id):
        """
        Get an employee by ID

        :param int employee_id: Employee ID.

        :return ViewEmployeeSchema: Employee.
        """

        service: EmployeeService = EmployeeService()
        return service.get_by_id(employee_id)


    @blp.arguments(UpdateEmployeeSchema)
    @blp.response(200, ViewEmployeeSchema)
    def put(self, employee_data, employee_id):
        """
        Update an employee by ID.

        :request UpdateEmployeeSchema employee_data: Employee data to be updated.
        :param int employee_id: Employee ID.

        :return ViewEmployeeSchema: Employee.
        """

        service: EmployeeService = EmployeeService()
        return service.update(id=employee_id, **employee_data)


    @blp.response(204)
    def delete(self, employee_id):
        """
        Deactivate na employee to indicate they are deleted.

        :param int employee_id: Employee ID.
        """

        service: EmployeeService = EmployeeService()
        service.delete(employee_id)


    @blp.response(200)
    def patch(self, employee_id):
        """
        Activate an employee to indicate they are deleted.

        :param int employee_id: Employee ID.
        """

        service: EmployeeService = EmployeeService()
        service.activate(employee_id)


@blp.route('/employee')
class EmployeeGeneral(MethodView):
    """Controllers for general employees"""

    @blp.response(200, ViewEmployeeSchema(many=True))
    def get(self):
        """
        Get all employees.

        :return list: List of employees.
        """

        service: EmployeeService = EmployeeService()
        return service.get_all()


    @blp.arguments(CreateEmployeeSchema)
    @blp.response(201, ViewEmployeeSchema)
    def post(self, employee_data):
        """
        Create a new employee on database.

        :request CreateEmployeeSchema employee_data: Employee data to be stored.

        :return ViewEmployeeSchema: Employee.
        """
        service: EmployeeService = EmployeeService()
        return service.create(**employee_data)
