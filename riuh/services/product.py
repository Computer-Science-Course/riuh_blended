from typing import List

from models.product import Product
from models.db import db

from flask_smorest import abort
from sqlalchemy.exc import (
    IntegrityError,
    SQLAlchemyError,
)

class ProductService:
    """Service for product."""

    def __init__(self):
        self.product = Product()


    def get_all(self):
        """Get all products."""

        return self.product.query.all()

    def get_by_id(
            self,
            id: int,
    ) -> Product:
        """Get an product by ID."""

        return self.product.query.get_or_404(id)

    def get_by_name(
            self,
            name: str,
    ) -> Product:
        """Get an product by name."""

        return self.product.query.filter_by(name=name).first_or_404()


    def get_by_active(
            self,
            active: bool,
    ) -> List[Product]:
        """Get all products by active."""

        return self.product.query.filter_by(active=active).all()

    def create(
            self,
            name: str, price: float,
            quantity: int, active: bool = True
    ) -> Product:
        """Create a new product."""

        self.product.name = name
        self.product.price = price
        self.product.quantity = quantity
        self.product.active = active

        try:
            db.session.add(self.product)
            db.session.commit()
            return self.product
        except IntegrityError as exception:
            abort(409, message=str(exception))
        except SQLAlchemyError as exception:
            abort(500, message=str(exception))


    def update(
            self,
            name: str, price: float,
            quantity: int, active: bool
    ) -> Product:
        """Update an product."""

        self.product.name = name
        self.product.price = price
        self.product.quantity = quantity
        self.product.active = active

        try:
            db.session.add(self.product)
            db.session.commit()
            return self.product
        except IntegrityError:
            abort(409, message='Product already exists.')
        except SQLAlchemyError as exception:
            abort(500, message=str(exception))


    def delete(
            self,
            id: int,
    ) -> None:
        """Delete an product."""

        self.product = self.product.query.get_or_404(id)
        self.product.active = False

        try:
            db.session.add(self.product)
            db.session.commit()
        except SQLAlchemyError as exception:
            abort(500, message=str(exception))


    def activate(
            self,
            id: int,
    ) -> None:
        """Activate an product."""

        self.product = self.product.query.get_or_404(id)
        self.product.active = True

        try:
            db.session.add(self.product)
            db.session.commit()
        except SQLAlchemyError as exception:
            abort(500, message=str(exception))
