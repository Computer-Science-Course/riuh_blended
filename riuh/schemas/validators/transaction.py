"""Transaction validators."""
from marshmallow import ValidationError

def validate_transaction_type(transaction_type):
    """
    Validate transaction type.

    :param str transaction_type: Transaction type.
    """
    transaction_types = ['CREDIT', 'WITHDRAWAL', 'BUY']
    if transaction_type not in transaction_types:
        raise ValidationError(f'Transaction type must be one of {transaction_types}')
