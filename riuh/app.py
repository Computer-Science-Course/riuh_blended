"""Main entry point."""
from flask import Flask
from flask_smorest import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import config_app, get_origins, load_envs
from models.db import db
from services.database import populate_database
from services.block_list import BlockListService

from controllers.client import blp as client_blp
from controllers.employee import blp as employee_blp
from controllers.order import blp as order_blp
from controllers.perk import blp as perk_blp
from controllers.product import blp as product_blp
from controllers.role import blp as role_blp
from controllers.transaction import blp as transaction_blp
from controllers.wallet import blp as wallet_blp

__version__: str = '0.1.0'


def create_app(db_url=None) -> Flask:
    """

    Create a Flask app instance.

    :param db_url: The database URL to connect to.

    :return: A Flask app instance.
    """
    load_envs()

    app = Flask(__name__)
    CORS(app, origins=get_origins())
    config_app(db_url, app)
    api = Api(app)
    jwt = JWTManager(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        jti = jwt_payload['jti']
        service_block_list: BlockListService = BlockListService()
        return service_block_list.jti_in_block_list(jti)

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return {
            'message': 'The token has been revoked.',
        }, 401

    db.init_app(app)
    with app.app_context():
        db.create_all()
        populate_database()

    api.register_blueprint(client_blp)
    api.register_blueprint(employee_blp)
    api.register_blueprint(order_blp)
    api.register_blueprint(perk_blp)
    api.register_blueprint(product_blp)
    api.register_blueprint(role_blp)
    api.register_blueprint(transaction_blp)
    api.register_blueprint(wallet_blp)

    return app
