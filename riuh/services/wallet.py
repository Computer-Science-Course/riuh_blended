from models.wallet import Wallet
from models.db import db

from flask_smorest import abort
from sqlalchemy.exc import (
    IntegrityError,
    SQLAlchemyError,
)

class WalletService:
    """Service for wallet."""

    def __init__(self):
        self.wallet = Wallet()


    def get_all(
            self,
            page: int = 1, per_page: int = 10,
    ):
        """Get all wallets."""

        offset = (page - 1) * per_page

        return self.wallet.query.offset(offset).limit(per_page).all()


    def get_by_id(
            self,
            id: int,
    ) -> Wallet:
        """Get an wallet by ID."""

        return self.wallet.query.get_or_404(id)


    def get_by_client_id(
            self,
            client_id: int,
    ) -> Wallet:
        """Get an wallet by client_id."""

        return self.wallet.query.filter_by(client_id=client_id).first_or_404()


    def create(
            self,
            client_id: int, balance: float = 0.00
    ) -> Wallet:
        """Create a new wallet."""

        self.wallet.client_id = client_id
        self.wallet.balance = balance

        try:
            db.session.add(self.wallet)
            db.session.commit()
            return self.wallet
        except IntegrityError:
            abort(409, message='This user already has an wallet.')
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))


    def update(
            self,
            client_id: int, balance: float
    ) -> Wallet:
        """Update an wallet."""

        self.wallet = self.get_by_client_id(client_id)

        self.wallet.balance = balance

        try:
            db.session.commit()
            return self.wallet
        except IntegrityError as exception:
            abort(409, message=str(exception))
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))


    def delete(
            self,
            id: int,
    ) -> None:
        """Delete an wallet."""

        self.wallet = self.get_by_id(id)

        try:
            db.session.delete(self.wallet)
            db.session.commit()
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))


    def add_balance(
            self,
            id: int,
            amount: float
    ) -> Wallet:
        """Add balance to an wallet."""

        self.wallet = self.get_by_id(id)

        self.wallet.balance += amount

        try:
            db.session.add(self.wallet)
            db.session.commit()
            return self.wallet
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))


    def subtract_balance(
            self,
            id: int,
            amount: float
    ) -> Wallet:
        """Subtract balance from an wallet."""

        self.wallet = self.get_by_id(id)

        self.wallet.balance -= amount

        try:
            db.session.commit()
            return self.wallet
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))
