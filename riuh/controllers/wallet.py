"""Wallet Controllers."""

from flask.views import MethodView
from flask_smorest import Blueprint

from schemas.wallet import (
    CreateWalletSchema,
    ViewWalletSchema,
    UpdateWalletSchema,
)
from services.wallet import (
    WalletService,
)

blp = Blueprint('Wallet', __name__, description='Operations on wallets.')

@blp.route('/wallet/<int:client_id>')
class Wallet(MethodView):
    """Controllers for specific wallet."""

    @blp.response(200, ViewWalletSchema)
    def get(self, client_id):
        """
        Get an wallet by its ID.

        :param int client_id: Client ID.

        :return ViewProductSchema: Product.
        """

        service: WalletService = WalletService()
        return service.get_by_client_id(client_id)


    @blp.arguments(UpdateWalletSchema)
    @blp.response(200, ViewWalletSchema)
    def put(self, wallet_data, client_id):
        """
        Update an wallet.

        :request UpdateWalletSchema wallet_data: Wallet to be updated.
        :param int client_id: Client ID.

        :return ViewWalletSchema: Wallet.
        """

        service: WalletService = WalletService()
        return service.update(client_id=client_id, **wallet_data)



@blp.route('/wallet')
class WalletGeneral(MethodView):
    """Controlers for general wallets."""

    @blp.response(200, ViewWalletSchema(many=True))
    def get(self):
        """
        Get all wallets.

        :return list: List of wallets.
        """

        service: WalletService = WalletService()
        return service.get_all()


    @blp.arguments(CreateWalletSchema)
    @blp.response(200, ViewWalletSchema)
    def post(self, wallet_data):
        """
        Create a new wallet.

        :return ViewOderSchema: Wallet to be stored.
        """

        service: WalletService = WalletService()
        return service.create(**wallet_data)
