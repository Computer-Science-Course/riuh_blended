from flask import Flask

from models.db import db
from services.database import populate_database
from config import config_app

__version__: str = '0.1.0'

def create_app(db_url=None) -> Flask:
    """
    Create a Flask app instance.

    :param db_url: The database URL to connect to.

    :return: A Flask app instance.
    """

    app = Flask(__name__)
    config_app(db_url, app)

    db.init_app(app)
    with app.app_context():
        db.create_all()
        populate_database()

    return app