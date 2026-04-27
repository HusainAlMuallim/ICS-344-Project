# the new content of DVSA-ORDER-GET/get_order.py [for lesson 10]
import json
import boto3
import os
import decimal
import traceback
from boto3.dynamodb.conditions import Key


# status list
# -----------
# 100: open
# 110: payment-failed
# 120: paid
# 200: processing
# 210: shipped
# 300: delivered
# 500: cancelled
# 600: rejected


class DecimalEncoder(json.JSONEncoder):
    """Convert DynamoDB Decimal values into normal JSON numbers."""
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            return int(o)
        return super(DecimalEncoder, self).default(o)


def json_safe(obj):
    return json.loads(json.dumps(obj, cls=DecimalEncoder))


def safe_error(message="bad request"):
    """
    Client-safe error response.
    Do not include stack traces, file paths, exception types, or raw event data.
    """
    return {
        "status": "err",
        "msg": message
    }


def parse_bool(value):
    if isinstance(value, bool):
        return value

    if value is None:
        return False

    if isinstance(value, str):
        return value.strip().lower() in ["true", "1", "yes", "y"]

    return bool(value)


def get_required_field(event, names):
    for name in names:
        value = event.get(name)
        if value is not None and value != "":
            return value
    return None


def lambda_handler(event, context):
    try:
        print("INFO: DVSA-ORDER-GET invoked")

        if not isinstance(event, dict):
            print("ERROR: Invalid event type:", type(event).__name__)
            return safe_error("bad request")

        order_id = get_required_field(event, ["orderId", "order-id", "order_id"])
        user_id = get_required_field(event, ["user", "userId", "user-id", "username", "sub"])
        is_admin = parse_bool(event.get("isAdmin", False))

        if not order_id:
            print("ERROR: Missing order ID. Event keys:", list(event.keys()))
            return safe_error("bad request")

        if not user_id and not is_admin:
            print("ERROR: Missing user ID. Event keys:", list(event.keys()))
            return safe_error("unauthorized")

        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table(os.environ["ORDERS_TABLE"])

        if is_admin:
            items = table.query(
                KeyConditionExpression=Key("orderId").eq(order_id)
            ).get("Items", [])
        else:
            key = {
                "orderId": order_id,
                "userId": user_id
            }
            item = table.get_item(Key=key).get("Item")
            items = [item] if item is not None else []

        if items and items[0] is not None:
            return json_safe({
                "status": "ok",
                "order": items[0]
            })

        return safe_error("could not find order")

    except Exception as e:
        print("ERROR: Unhandled internal exception:", repr(e))
        print(traceback.format_exc())
        return safe_error("internal error")