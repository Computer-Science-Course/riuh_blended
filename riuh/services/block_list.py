"""Block List Service."""
from models.db import db
from models.block_list import BlockList

from flask_smorest import abort
from sqlalchemy.exc import (
    IntegrityError,
    SQLAlchemyError,
)

class BlockListService:
    """Service for block list."""

    def __init__(self):
        self.block_list = BlockList()


    def get_all(self):
        """Get all block lists."""

        return self.block_list.query.all()


    def get_by_id(
            self,
            id: int,
    ) -> BlockList:
        """Get an block list by ID."""

        return self.block_list.query.get_or_404(id)


    def get_by_jti(
            self,
            jti: str,
    ) -> BlockList:
        """Get an block list by jti."""

        return self.block_list.query.filter_by(jti=jti).first_or_404()


    def create(
            self,
            jti: str,
    ) -> BlockList:
        """Create a new block list."""

        try:
            self.block_list.jti = jti
            db.session.add(self.block_list)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            abort(409, message='Block list already exists.')

        return self.block_list


    def delete(
            self,
            id: int,
    ) -> None:
        """Delete an block list by ID."""

        block_list = self.get_by_id(id)

        try:
            db.session.delete(block_list)
            db.session.commit()
        except SQLAlchemyError as exception:
            db.session.rollback()
            abort(500, message=str(exception))


    def jti_in_block_list(
            self,
            jti: str,
    ) -> bool:
        """Check if jti is in block list."""

        return self.block_list.query.filter_by(jti=jti).first() is not None
