"""Database service module."""
from random import (
    randint,
    choice,
)

from services import (
    ClientService,
    EmployeeService,
    TransactionService,
    WalletService,
)

def populate_clients():
    """Populate the clients table with some default data."""

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
            'name': 'Mateus Santos',
            'document': '123456789',
            'username': 'matcraft',
            'password': '1234',
            'active': True
        },
        {
            'name': 'Joana Malheiros',
            'document': '987654321',
            'username': 'joanas',
            'password': '1234',
            'active': True
        },
        {
            'name': 'Rafaela Almeida',
            'document': '456789012',
            'username': 'rafaela',
            'password': '1234',
            'active': False
        },
        {
            'name': 'Ricardo Santos',
            'document': '901234567',
            'username': 'ricardos',
            'password': '1234',
            'active': True
        },
        {
            'name': 'Fernanda Oliveira',
            'document': '345678901',
            'username': 'fernandao',
            'password': '1234',
            'active': True
        },
        {
            'name': 'Gustavo Pereira',
            'document': '678901234',
            'username': 'gustavop',
            'password': '1234',
            'active': False
        },
    ]

    for employee in employees:
        try:
            service: EmployeeService = EmployeeService()
            service.get_by_username(employee.get('username'))
        except Exception:
            service.create(**employee)


def populate_transactions():
    """Populate the transactions table with some default data."""

    transactions: list = [
        {
            'client_id': randint(1, 10),
            'employee_id': randint(2, 6),
            'amount': randint(1, 100),
            '_type': choice(['CREDIT', 'WITHDRAWAL', 'BUY']),
        }
        for _ in range(20)
    ]

    for transaction in transactions:
        try:
            client_service: ClientService = ClientService()
            employee_service: EmployeeService = EmployeeService()

            client_service.get_by_id(transaction.get('client_id'))
            employee_service.get_by_id(transaction.get('employee_id'))

            service: TransactionService = TransactionService()
            service.create(**transaction)
        except Exception:
            print('Error creating transaction.')

def populate_database():
    """Populate the database with some default data."""
    populate_employees()
    populate_clients()
    populate_transactions()