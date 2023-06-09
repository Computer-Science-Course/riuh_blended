from typing import List

from models.role import Role
from models.db import db

from flask_smorest import abort
from sqlalchemy.exc import (
    IntegrityError,
    SQLAlchemyError,
)

class RoleService:
    """Service for Role."""

    def __init__(self):
        self.role = Role()


    def get_all(self):
        """Get all roles."""

        return self.role.query.all()


    def get_by_id(
            self,
            id: int,
    ) -> Role:
        """Get an role by ID."""

        return self.role.query.get_or_404(id)


    def get_by_label(
            self,
            label: str,
    ) -> Role:
        """Get an role by label."""

        return self.role.query.filter_by(label=label).first_or_404()


    def get_all_by_active(
            self,
            active: bool,
    ) -> List[Role]:
        """Get all roles by active."""

        return self.role.query.filter_by(active=active).all()


    def create(
            self,
            label: str, description: str,
            active: bool
    ) -> Role:
        """Create a new role."""

        self.role.label = label
        self.role.description = description
        self.role.active = active
        
        try:
            db.session.add(self.role)
            db.session.commit()
            return self.role
        except IntegrityError:
            abort(400, message='Role already exists.')
        except SQLAlchemyError:
            abort(400, message='Role already exists.')


    def update(
            self,
            id: int,
            label: str, description: str,
            active: bool
    ) -> Role:
        """Update an role."""

        self.role = self.get_by_id(id)

        self.role.label = label
        self.role.description = description
        self.role.active = active

        try:
            db.session.commit()
            return self.role
        except IntegrityError:
            abort(400, message='Role already exists.')
        except SQLAlchemyError:
            abort(400, message='Role already exists.')


    def delete(
            self,
            id: int,
    ) -> Role:
        """Delete an role."""

        self.role = self.get_by_id(id)
        self.role.active = False

        try:
            db.session.add(self.role)
            db.session.commit()
            return self.role
        except IntegrityError:
            abort(400, message='Role already exists.')
        except SQLAlchemyError:
            abort(400, message='Role already exists.')


    def restore(
            self,
            id: int,
    ) -> Role:
        """Restore an role."""

        self.role = self.get_by_id(id)
        self.role.active = True

        try:
            db.session.add(self.role)
            db.session.commit()
            return self.role
        except IntegrityError:
            abort(400, message='Role already exists.')
        except SQLAlchemyError:
            abort(400, message='Role already exists.')
        