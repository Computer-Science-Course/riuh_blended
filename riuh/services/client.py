from typing import List
from models.db import db

from models.client import Client

from flask_smorest import abort
from sqlalchemy.exc import (
    IntegrityError,
    SQLAlchemyError,
)

class ClientService:
    """Service for client."""

    def __init__(self):
        self.client = Client()


    def get_all(self):
        """Get all clients."""

        return self.client.query.all()


    def get_by_id(
            self,
            id: int,
    ) -> Client:
        """Get an client by ID."""

        return self.client.query.get_or_404(id)


    def get_by_username(
            self,
            username: str,
    ) -> Client:
        """Get an client by username."""

        return self.client.query.filter_by(username=username).first_or_404()


    def get_by_name(
            self,
            name: str,
    ) -> Client:
        """Get an client by name."""

        return self.client.query.filter_by(name=name).first_or_404()


    def get_by_registration(
            self,
            registration: str,
    ) -> Client:
        """Get an client by registration."""

        return self.client.query.filter_by(registration=registration).first_or_404()


    def get_by_active(
            self,
            active: bool,
    ) -> List[Client]:
        """Get all clients by active."""

        return self.client.query.filter_by(active=active).all()


    def create(
            self,
            name: str, registration: str,
            username: str, active: bool = True
    ) -> Client:
        """Create a new client."""

        self.client.name = name
        self.client.registration = registration
        self.client.username = username
        self.client.active = active

        try:
            db.session.add(self.client)
            db.session.commit()
            return self.client
        except IntegrityError:
            abort(409, message='Client already exists.')
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))


    def update(
            self,
            id: int,
            name: str, registration: str,
            username: str, active: bool
    ) -> Client:
        """Update an client."""

        self.client = self.get_by_id(id)

        self.client.name = name
        self.client.registration = registration
        self.client.username = username
        self.client.active = active

        try:
            db.session.add(self.client)
            db.session.commit()
            return self.client
        except IntegrityError:
            abort(409, message='Client already exists.')
        except SQLAlchemyError as exception:
            abort(400, message=str(exception))


    def delete(
            self,
            id: int,
    ) -> None:
        """Delete an client."""

        self.client = self.get_by_id(id)
        self.client.active = False

        try:
            db.session.add(self.client)
            db.session.commit()
        except SQLAlchemyError as exception:
            abort(500, message=str(exception))


    def activate(
            self,
            id: int,
    ) -> None:
        """Activate an client."""

        self.client = self.get_by_id(id)
        self.client.active = True

        try:
            db.session.add(self.client)
            db.session.commit()
        except SQLAlchemyError as exception:
            abort(500, message=str(exception))
