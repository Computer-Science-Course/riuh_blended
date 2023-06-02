from services import EmployeeService

def populate_employees():
    """Populate the employees table with some default data."""
    service: EmployeeService = EmployeeService()

    employees: dict = [
        {
            'name': 'Admin',
            'document': '00000000000',
            'username': 'admin',
            'password': 'admin',
            'active': True
        },
        {
            'name': 'Employee',
            'document': '11111111111',
            'username': 'employee',
            'password': 'employee',
            'active': True
        },
    ]

    for employee in employees:
        try:
            service.get_by_username(employee.get('username'))
        except Exception as e:
            service.create(**employee)

def populate_database():
    """Populate the database with some default data."""
    populate_employees()