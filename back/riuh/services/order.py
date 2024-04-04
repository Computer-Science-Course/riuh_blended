from decimal import Decimal
from typing import List

from models.order import Order
from models.db import db

from flask_smorest import abort
from sqlalchemy.exc import (
    IntegrityError,
    SQLAlchemyError,
)
from services.transaction import (
    TransactionService,
)
from services.wallet import (
    WalletService,
)

class OrderService:
    """Service for order."""

    def __init__(self):
        self.order = Order()
    

    def get_all(
            self,
            page: int = 1, per_page: int = 10,
    ):
        """Get all orders."""

        offset = (page - 1) * per_page

        return self.order.query.offset(offset).limit(per_page).all()


    def get_by_id(
            self,
            id: int,
    ) -> Order:
        """Get an order by ID."""

        return self.order.query.get_or_404(id)


    def get_by_client_id(
            self,
            client_id: int,
    ) -> List[Order]:
        """Get all orders by client_id."""

        return self.order.query.filter_by(client_id=client_id).all()


    def get_by_employee_id(
            self,
            employee_id: int,
    ) -> List[Order]:
        """Get all orders by employee_id."""

        return self.order.query.filter_by(employee_id=employee_id).all()


    def get_by_product_id(
            self,
            product_id: int,
    ) -> List[Order]:
        """Get all orders by product_id."""

        return self.order.query.filter_by(product_id=product_id).all()


    def create(
            self,
            client_id: int, employee_id: int,
            product_id: int, price: float,
            quantity: int, isPayingFromWallet: bool = False,
    ) -> Order:
        """Create a new order."""

        self.order.client_id = client_id
        self.order.employee_id = employee_id
        self.order.product_id = product_id
        self.order.price = price
        self.order.quantity = quantity

        try:
            amount = Decimal(str(price)) * Decimal(str(quantity))
            if isPayingFromWallet:
                self.pay_from_wallet(client_id, amount)                

            db.session.add(self.order)
            db.session.commit()

            self.attach_order_transaction(
                client_id, employee_id, amount, 'BUY'
            )
            return self.order
        except IntegrityError as exception:
            abort(409, message=str(exception))
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))


    def update(
            self,
            id: int,
            client_id: int, employee_id: int,
            product_id: int, price: float,
            quantity: int,
    ) -> Order:
        """Update an order."""

        self.order = self.get_by_id(id)

        self.order.client_id = client_id
        self.order.employee_id = employee_id
        self.order.product_id = product_id
        self.order.price = price
        self.order.quantity = quantity

        try:
            db.session.add(self.order)
            db.session.commit()
            return self.order
        except IntegrityError as exception:
            abort(409, message=str(exception))
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))


    def delete(
            self,
            id: int,
    ) -> None:
        """Delete an order."""

        self.order = self.get_by_id(id)

        try:
            db.session.delete(self.order)
            db.session.commit()
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))
    
    def pay_from_wallet(
            self,
            client_id: int,
            amount: Decimal,
    ) -> None:
        """Pay from wallet."""

        wallet_service: WalletService = WalletService()
        wallet = wallet_service.get_by_client_id(client_id)
        if Decimal(str(wallet.balance)) - amount < 0:
            message = 'Saldo insuficiente'
            abort(403, message=message)
        wallet_service.subtract_balance(
            id=wallet.id,
            amount=amount,
        )

    def attach_order_transaction(
            self,
            client_id: int,
            employee_id: int,
            amount: Decimal,
            type: str,
    ) -> None:
        """Attach order transaction."""

        transaction_service: TransactionService = TransactionService()
        transaction_service.create(
            client_id, employee_id, amount, type
        )
