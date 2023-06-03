import os

from flask import Flask

def config_app(
    db_url: str = None,
    app: Flask = None,
) -> None:
    """
    Configure a Flask app instance.

    :param db_url: The database URL to connect to.
    :param app: The Flask app instance to configure.
    """
    app.config['PROPAGATE_EXCEPTIONS'] = True
    app.config['API_TITLE'] = 'riuh REST API'
    app.config['API_VERSION'] = 'v1'
    app.config['OPENAPI_VERSION'] = '3.0.3'
    app.config['OPENAPI_URL_PREFIX'] = '/'
    app.config['OPENAPI_SWAGGER_UI_PATH'] = '/swagger-ui'
    app.config['OPENAPI_SWAGGER_UI_URL'] = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/'
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url or os.getenv(
        'DATABASE_URL', 'sqlite:///data.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False