from typing import List

from models.perk import Perk
from models.db import db

from flask_smorest import abort
from sqlalchemy.exc import (
    IntegrityError,
    SQLAlchemyError,
)

class PerkService:
    """Service for Perk."""

    def __init__(self):
        self.perk = Perk()


    def get_all(self):
        """Get all perks."""

        return self.perk.query.all()


    def get_by_id(
            self,
            id: int,
    ) -> Perk:
        """Get an perk by ID."""

        return self.perk.query.get_or_404(id)
    

    def get_by_employee_id(
            self,
            employee_id: int,
    ) -> Perk:
        """Get an perk by employee_id."""

        return self.perk.query.filter_by(employee_id=employee_id).first()


    def get_all_by_employee_id(
            self,
            employee_id: int,
    ) -> List[Perk]:
        """Get all perks by employee_id."""

        return self.perk.query.filter_by(employee_id=employee_id).all()


    def get_all_by_role_id(
            self,
            role_id: int,
    ) -> List[Perk]:
        """Get all perks by role_id."""

        return self.perk.query.filter_by(role_id=role_id).all()


    def create(
            self,
            employee_id: int, role_id: int,
    ) -> Perk:
        """Create a new perk."""

        self.perk.employee_id = employee_id
        self.perk.role_id = role_id

        try:
            db.session.add(self.perk)
            db.session.commit()
            return self.perk
        except IntegrityError:
            abort(409, message='Perk already exists.')
        except SQLAlchemyError:
            abort(409, message='Perk already exists.')


    def update(
            self,
            employee_id: int, role_id: int,
    ) -> Perk:
        """Update an perk."""

        self.perk.employee_id = employee_id
        self.perk.role_id = role_id

        try:
            db.session.add(self.perk)
            db.session.commit()
            return self.perk
        except IntegrityError:
            abort(409, message='Perk already exists.')
        except SQLAlchemyError:
            abort(409, message='Perk already exists.')


    def delete(
            self,
            id: int,
    ) -> Perk:
        """Delete an perk."""

        self.perk = self.get_by_id(id)

        try:
            db.session.delete(self.perk)
            db.session.commit()
        except SQLAlchemyError:
            abort(400, message='Perk does not exist.')
