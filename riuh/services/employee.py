from typing import List

from models import Employee
from models.db import db

from flask_smorest import abort
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.exc import (
    IntegrityError,
    SQLAlchemyError,
)

class EmployeeService:

    def __init__(self):
        self.employee = Employee()


    def get_all(self):
        """Get all employees."""
        return self.employee.query.all()


    def get_by_id(
            self,
            id: int,
    ) -> Employee:
        """Get an employee by ID."""
        return self.employee.query.get_or_404(id)


    def get_by_username(
            self,
            username: str,
    ) -> Employee:
        """Get an employee by username."""
        return self.employee.query.filter_by(username=username).first_or_404()


    def get_by_document(
            self,
            document: str,
    ) -> Employee:
        """Get an employee by document."""
        return self.employee.query.filter_by(document=document).first_or_404()


    def get_by_name(
            self,
            name: str,
    ) -> Employee:
        """Get an employee by name."""
        return self.employee.query.filter_by(name=name).first_or_404()


    def get_by_active(
            self,
            active: bool,
    ) -> List[Employee]:
        """Get all employees by active."""
        return self.employee.query.filter_by(active=active).all()


    def create(
            self,
            name: str, document: str,
            username: str, password: str,
            active: bool
    ) -> Employee:
        """Create a new employee."""
        self.employee.name = name
        self.employee.document = document
        self.employee.username = username
        self.employee.password = sha256.hash(password)
        self.employee.active = active
        
        try:
            db.session.add(self.employee)
            db.session.commit()
            return self.employee
        except IntegrityError:
            abort(409, message='User already exists.')
        except SQLAlchemyError as e:
            abort(500, message=str(e))


    def update(
            self,
            id: int, name: str,
            document: str, username: str,
            password: str, active: bool
    ) -> Employee:
        """Update an employee."""
        self.employee = self.get_by_id(id)
        self.employee.name = name
        self.employee.document = document
        self.employee.username = username
        if self._is_new_password():
            self.employee.password = sha256.hash(password)
        self.employee.active = active
        
        try:
            db.session.add(self.employee)
            db.session.commit()
            return self.employee
        except IntegrityError:
            abort(409, message='User already exists.')
        except SQLAlchemyError as e:
            abort(500, message=str(e))


    def delete(
            self,
            id: int,
    ) -> None:
        """Delete an employee."""
        self.employee = self.get_by_id(id)
        self.employee.active = False

        try:
            db.session.add(self.employee)
            db.session.commit()
        except SQLAlchemyError as e:
            abort(500, message=str(e))


    def activate(
            self,
            id: int,
    ) -> None:
        """Activate an employee."""
        self.employee = self.get_by_id(id)
        self.employee.active = True

        try:
            db.session.add(self.employee)
            db.session.commit()
        except SQLAlchemyError as e:
            abort(500, message=str(e))


    def _is_new_password(
            self,
            password: str,
    ) -> bool:
        """Check if the password is new."""
        return sha256.hash(password) != self.employee       