"""Database service module."""

from random import (
    randint,
    choice,
)

from services import (
    ClientService,
    EmployeeService,
    OrderService,
    ProductService,
    PerkService,
    RoleService,
    TransactionService,
    WalletService,
)

def populate_clients():
    """Populate the clients table with some default data."""

    clients: list = [
        {
            'name': 'Mateus Santos Mendonça',
            'registration': '1929040019',
            'username': 'mateuzin',
            'course': 'Ciência da Computação',
            'active': True
        },
        {
            'name': 'Dâmaris Campos',
            'registration': 'E000861',
            'username': 'damaris',
            'course': 'Ciência da Computação',
            'active': False
        },
        {
            'name': 'Maria Santos',
            'registration': '1234567890123',
            'username': 'maria',
            'course': 'Ciência da Computação',
            'active': True
        },
        {
            'name': 'Ana Ferreira',
            'registration': '4567890123456',
            'username': 'ana',
            'course': 'Ciência da Computação',
            'active': True
        },
        {
            'name': 'Lucas Almeida',
            'registration': '7890123456789',
            'username': 'lucas',
            'course': 'Ciência da Computação',
            'active': False
        },
        {
            'name': 'Carla Silva',
            'registration': '5678901234567',
            'username': 'carla',
            'course': 'Ciência da Computação',
            'active': True
        },
        {
            'name': 'Ricardo Santos',
            'registration': '9012345678901',
            'username': 'ricardo',
            'course': 'Ciência da Computação',
            'active': True
        },
        {
            'name': 'Fernanda Oliveira',
            'registration': '3456789012345',
            'username': 'fernanda',
            'course': 'Ciência da Computação',
            'active': True
        },
        {
            'name': 'Gustavo Pereira',
            'registration': '6789012345678',
            'username': 'gustavo',
            'course': 'Ciência da Computação',
            'active': False
        },
        {
            'name': 'Mariana Alves',
            'registration': '0123456789012',
            'username': 'mariana',
            'course': 'Ciência da Computação',
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
            wallet_service.create(client_id=new_client.id, balance=100)


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
            'transaction_type': choice(['CREDIT', 'WITHDRAWAL', 'BUY']),
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


def populate_products():
    """Populate the products table with some default data."""

    product_names = [
        'Desjejum',
        'Almoço',
        'Lanche',
        'Jantar',
    ]
    products: list = [
        {
            'name': name,
            'price': choice([1.8, 0.8]),
            'quantity': randint(1, 100),
            'active': True
        }
        for name in product_names
    ]

    for product in products:
        try:
            service: ProductService = ProductService()
            service.get_by_name(product.get('name'))
        except Exception:
            service.create(**product)


def populate_orders():
    """Populate the orders table with some default data."""

    orders: list = [
        {
            'client_id': randint(1, 10),
            'employee_id': randint(2, 6),
            'product_id': randint(1, 4),
            'price': randint(500, 10000) / 100,
            'quantity': randint(1, 5),
        }
        for _ in range(20)
    ]

    for order in orders:
        try:
            client_service: ClientService = ClientService()
            employee_service: EmployeeService = EmployeeService()
            product_service: ProductService = ProductService()

            client_service.get_by_id(order.get('client_id'))
            employee_service.get_by_id(order.get('employee_id'))
            product_service.get_by_id(order.get('product_id'))

            service: OrderService = OrderService()
            service.create(**order)
        except Exception:
            print('Error creating order.')


def populate_roles():
    """Populate the roles table with some default data."""

    roles: list = [
        {
            'label': 'admin',
            'level': 1,
            'description': 'Full access and control over all CRUD operations; Can create, read, update, and delete any record in the system; Has unrestricted administrative privileges.',
            'active': True
        },
        {
            'label': 'manager',
            'level': 2,
            'description': 'Can create, read, update, and delete records within their assigned domain or department; Has permissions to manage and oversee specific areas of the system; Have limited administrative privileges.',
            'active': True
        },
        {
            'label': 'employee',
            'level': 3,
            'description': 'Can create, read, update, and delete their own records; Limited access to certain features or functionalities compared to managers and superusers; Typically represents a regular user or customer of the system.',
            'active': True
        },
        {
            'label': 'guest',
            'level': 4,
            'description': 'Read-only access to certain public information or resources; Cannot create, update, or delete records; Accessible to users who haven\'t logged in or registered in the system.',
            'active': True
        }
    ]

    for role in roles:
        try:
            service: RoleService = RoleService()
            service.get_by_label(role.get('label'))
        except Exception:
            service.create(**role)


def populate_perks():
    """Populate the perks table with some default data."""

    perks: list = [
        {
            'employee_id': employee_id,
            'role_id': randint(2, 4),
        }
        for employee_id in range(2, 7)
    ]
    # Admin
    perks.append(
        {
            'employee_id': 1,
            'role_id': 1,
        }
    )

    for perk in perks:
        try:
            employee_service: EmployeeService = EmployeeService()
            role_service: RoleService = RoleService() 

            employee_service.get_by_id(perk.get('employee_id'))
            role_service.get_by_id(perk.get('role_id'))

            service: PerkService = PerkService()
            if not service.get_by_employee_id(perk.get('employee_id')):
                service.create(**perk)
        except Exception:
            print('Error creating perk.')


def populate_database():
    """Populate the database with some default data."""

    populate_employees()
    populate_clients()
    # populate_transactions()
    populate_products()
    populate_orders()
    populate_roles()
    populate_perks()