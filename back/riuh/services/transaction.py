from typing import List

from models.transaction import Transaction
from models.db import db

from flask_smorest import abort
from sqlalchemy.exc import (
    IntegrityError,
    SQLAlchemyError,
)

class TransactionService:
    """Service for Transaction."""

    def __init__(self):
        self.transaction = Transaction()


    def get_all(
            self,
            page: int = 1, per_page: int = 10,
    ):
        """Get all transactions."""

        offset = (page - 1) * per_page

        return self.transaction.query.offset(offset).limit(per_page).all()


    def get_by_id(
            self,
            id: int,
    ) -> Transaction:
        """Get an transaction by ID."""

        return self.transaction.query.get_or_404(id)


    def get_all_by_client_id(
            self,
            client_id: int,
    ) -> List[Transaction]:
        """Get all transactions by client_id."""

        return self.transaction.query.filter_by(client_id=client_id).all()


    def get_all_by_employee_id(
            self,
            employee_id: int,
    ) -> List[Transaction]:
        """Get all transactions by employee_id."""

        return self.transaction.query.filter_by(employee_id=employee_id).all()


    def get_all_bytransaction_type(
            self,
            transaction_type: str,
    ) -> List[Transaction]:
        """Get all transactions by type."""

        return self.transaction.query.filter_by(type=transaction_type).all()


    def create(
            self,
            client_id: int, employee_id: int,
            amount: float, transaction_type: str
    ) -> Transaction:
        """Create a new transaction."""

        self.transaction.client_id = client_id
        self.transaction.employee_id = employee_id
        self.transaction.amount = amount
        self.transaction.transaction_type = transaction_type

        try:
            db.session.add(self.transaction)
            db.session.commit()
            return self.transaction
        except IntegrityError:
            abort(400, message='Transaction already exists.')
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))


    def update(
            self,
            id: int,
            client_id: int, employee_id: int,
            amount: float, transaction_type: str
    ) -> Transaction:
        """Update an transaction."""

        self.transaction = self.get_by_id(id)
        self.transaction.client_id = client_id
        self.transaction.employee_id = employee_id
        self.transaction.amount = amount
        self.transaction.transaction_type = transaction_type

        try:
            db.session.add(self.transaction)
            db.session.commit()
            return self.transaction
        except IntegrityError:
            abort(400, message='Transaction already exists.')
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))


    def delete(
            self,
            id: int,
    ) -> Transaction:
        """Delete an transaction."""

        self.transaction = self.get_by_id(id)

        try:
            db.session.delete(self.transaction)
            db.session.commit()
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))
