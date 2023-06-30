from flask import Flask
from flask_smorest import Api

from models.db import db
from services.database import populate_database
from config import config_app
from controllers.employee import blp as employee_blp

from controllers.employee import blp as employee_blp
from controllers.client import blp as client_blp
from controllers.product import blp as product_blp

__version__: str = '0.1.0'

def create_app(db_url=None) -> Flask:
    """

    Create a Flask app instance.

    :param db_url: The database URL to connect to.

    :return: A Flask app instance.
    """


    app = Flask(__name__)
    config_app(db_url, app)
    api = Api(app)

    db.init_app(app)
    with app.app_context():
        db.create_all()
        populate_database()
    
    api.register_blueprint(employee_blp)
    api.register_blueprint(client_blp)
    api.register_blueprint(product_blp)

    return app
