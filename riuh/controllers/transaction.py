"""Transaction controllers."""

from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import (
    jwt_required,
)

from schemas.transaction import (
    CreateTransactionSchema,
    ViewTransactionSchema,
    UpdateTransactionSchema,
)
from services.transaction import (
    TransactionService,
)

blp = Blueprint('Transaction', __name__, description='Opretations on Transactions.')

@blp.route('/transaction/<int:transaction_id>')
class Transaction(MethodView):
    """Controllers for specific transaction."""

    @jwt_required()
    @blp.response(200, ViewTransactionSchema)
    def get(self, transaction_id):
        """
        Get a transaction by its ID.

        :param int transaction_id: Transaction ID.

        :return ViewTransactionSchema: Transaction.
        """

        service: TransactionService = TransactionService()
        return service.get_by_id(transaction_id)


    @jwt_required()
    @blp.arguments(UpdateTransactionSchema)
    @blp.response(200, ViewTransactionSchema)
    def put(self, transaction_data, transaction_id):
        """
        Update a transaction.

        :request UpdateTransactionSchema transaction_data: Transaction to be updated.
        :param int transaction_id: Transaction ID.

        :return ViewTransactionSchema: Transaction.
        """

        service: TransactionService = TransactionService()
        return service.update(id=transaction_id, **transaction_data)


    @jwt_required()
    @blp.response(200)
    def delete(self, transaction_id):
        """
        Delete a transaction.

        :param int transaction_id: Transaction ID.
        """

        service: TransactionService = TransactionService()
        return service.delete(transaction_id)


@blp.route('/transaction')
class TransactionGeneral(MethodView):
    """Controllers for general transactions."""

    @jwt_required()
    @blp.response(200, ViewTransactionSchema(many=True))
    def get(self):
        """
        Get all transactions.

        :return list: List of Transactions.
        """

        service: TransactionService = TransactionService()
        return service.get_all()

    @jwt_required()
    @blp.arguments(CreateTransactionSchema)
    @blp.response(200, ViewTransactionSchema)
    def post(self, transaction_data):
        """
        Create a new transaction.

        :return ViewOderSchema: Transaction to be stored.
        """

        service: TransactionService = TransactionService()
        return service.create(**transaction_data)
