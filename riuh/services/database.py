from services import (
    ClientService,
    EmployeeService,
    WalletService,    
)

def populate_clients():
    """Populate the employees table with some default data."""

    clients: list = [
        {
            'name': 'Jorge da Silva',
            'registration': '7658976589467',
            'username': 'jorge',
            'active': True
        },
        {
            'name': 'Maria Santos',
            'registration': '1234567890123',
            'username': 'maria',
            'active': True
        },
        {
            'name': 'Pedro Oliveira',
            'registration': '9876543210987',
            'username': 'pedro',
            'active': False
        },
        {
            'name': 'Ana Ferreira',
            'registration': '4567890123456',
            'username': 'ana',
            'active': True
        },
        {
            'name': 'Lucas Almeida',
            'registration': '7890123456789',
            'username': 'lucas',
            'active': False
        },
        {
            'name': 'Carla Silva',
            'registration': '5678901234567',
            'username': 'carla',
            'active': True
        },
        {
            'name': 'Ricardo Santos',
            'registration': '9012345678901',
            'username': 'ricardo',
            'active': True
        },
        {
            'name': 'Fernanda Oliveira',
            'registration': '3456789012345',
            'username': 'fernanda',
            'active': True
        },
        {
            'name': 'Gustavo Pereira',
            'registration': '6789012345678',
            'username': 'gustavo',
            'active': False
        },
        {
            'name': 'Mariana Alves',
            'registration': '0123456789012',
            'username': 'mariana',
            'active': True
        },
    ]

    for client in clients:
        try:
            service: ClientService = ClientService()
            service.get_by_username(client.get('username'))
        except Exception:
            new_client = service.create(**client)
            wallet_service: WalletService = WalletService()
            wallet_service.create(client_id=new_client.id)
     

def populate_employees():
    """Populate the employees table with some default data."""

    employees: list = [
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
        {
            'name': 'Bartolomeu',
            'document': '11111111111',
            'username': 'bartolomeu',
            'password': 'bartolomeu',
            'active': True
        },
    ]

    for employee in employees:
        try:
            service: EmployeeService = EmployeeService()
            service.get_by_username(employee.get('username'))
        except Exception:
            service.create(**employee)

def populate_database():
    """Populate the database with some default data."""
    populate_employees()
    populate_clients()