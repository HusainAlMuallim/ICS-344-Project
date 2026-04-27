// the updated content of DVSA-ORDER-MANAGER/order-manager.js [for lessons: 1, 2,  5]

const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
const jose = require("node-jose");

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient());
const ORDERS_TABLE = process.env.ORDERS_TABLE;
const INBOX_TABLE = process.env.INBOX_TABLE;

// --- Access-control helpers: The core fix for Lesson 5 (IDOR) ---
async function userOwnsOrder(user, orderId) {
  if (!orderId || !ORDERS_TABLE) return false;
  try {
    const res = await ddb.send(
      new GetCommand({
        TableName: ORDERS_TABLE,
        Key: { "order-id": orderId },
      }),
    );
    // Verify the 'user' attribute in the DB matches the 'user' from the JWT
    return !!(res.Item && res.Item.user === user);
  } catch (e) {
    return false;
  }
}

async function userOwnsMessage(user, msgId) {
  if (!msgId || !INBOX_TABLE) return false;
  try {
    const res = await ddb.send(
      new GetCommand({
        TableName: INBOX_TABLE,
        Key: { "msg-id": msgId },
      }),
    );
    return !!(res.Item && res.Item.user === user);
  } catch (e) {
    return false;
  }
}

function deny(callback, code, msg) {
  return callback(null, {
    statusCode: code,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ status: "err", message: msg }),
  });
}

const ORDER_SCOPED = new Set([
  "get",
  "update",
  "cancel",
  "shipping",
  "billing",
  "complete",
]);
const MSG_SCOPED = new Set(["message", "delete"]);

exports.handler = (event, context, callback) => {
  var req =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  var headers =
    typeof event.headers === "string"
      ? JSON.parse(event.headers)
      : event.headers;

  var auth_header = headers.Authorization || headers.authorization || "";
  var raw_token = auth_header.startsWith("Bearer ")
    ? auth_header.split(" ")[1]
    : auth_header;

  var token_sections = raw_token.split(".");
  if (token_sections.length < 2) {
    return callback(null, {
      statusCode: 401,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Invalid or missing token" }),
    });
  }

  var auth_data = jose.util.base64url.decode(token_sections[1]);
  var token = JSON.parse(auth_data);
  var user = token.username;

  var isAdmin = false;
  var params = { UserPoolId: process.env.userpoolid, Username: user };

  try {
    const cognitoidentityserviceprovider = new CognitoIdentityProviderClient();
    const command = new AdminGetUserCommand(params);

    cognitoidentityserviceprovider
      .send(command)
      .then(async (userData) => {
        // Lesson 2 Fix: Check the custom admin attribute
        var attributes = userData.UserAttributes;
        for (var i = 0; i < attributes.length; i++) {
          if (attributes[i].Name === "custom:is_admin") {
            isAdmin = attributes[i].Value;
            break;
          }
        }

        var action = req.action;
        var isOk = true;
        var payload = {};
        var functionName = "";

        switch (action) {
          case "new":
            payload = {
              user: user,
              cartId: req["cart-id"],
              items: req["items"],
            };
            functionName = "DVSA-ORDER-NEW";
            break;
          case "update":
            payload = {
              user: user,
              orderId: req["order-id"],
              items: req["items"],
            };
            functionName = "DVSA-ORDER-UPDATE";
            break;
          case "cancel":
            payload = { user: user, orderId: req["order-id"] };
            functionName = "DVSA-ORDER-CANCEL";
            break;
          case "get":
            payload = { user: user, orderId: req["order-id"] };
            functionName = "DVSA-ORDER-GET";
            break;
          case "orders":
            payload = { user: user };
            functionName = "DVSA-ORDER-ORDERS";
            break;
          case "complete":
            payload = { user: user, orderId: req["order-id"] };
            functionName = "DVSA-ORDER-COMPLETE";
            break;
          case "admin-orders":
            if (isAdmin === "true") {
              payload = { user: user, data: req["data"] };
              functionName = "DVSA-ADMIN-GET-ORDERS";
            } else {
              return deny(
                callback,
                403,
                "Unauthorized: Admin privileges required.",
              );
            }
            break;
          default:
            // Add other cases (shipping, billing, profile, etc.) as needed
            functionName = "DVSA-ORDER-GET";
            isOk = !!action;
        }

        // --- The Gatekeeper: Final validation for Lesson 5 ---
        if (isOk && ORDER_SCOPED.has(action)) {
          const owns = await userOwnsOrder(user, req["order-id"]);
          if (!owns && isAdmin !== "true") {
            return deny(
              callback,
              403,
              "Access Denied: You do not own this order resource.",
            );
          }
        }

        if (isOk) {
          var invokeParams = {
            FunctionName: functionName,
            InvocationType: "RequestResponse",
            Payload: JSON.stringify(payload),
          };
          const lambda_client = new LambdaClient();
          const invokeCommand = new InvokeCommand(invokeParams);
          const response = await lambda_client.send(invokeCommand);
          const data = JSON.parse(Buffer.from(response.Payload).toString());

          callback(null, {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data),
          });
        }
      })
      .catch((e) => deny(callback, 500, e.message));
  } catch (e) {
    deny(callback, 500, e.message);
  }
};
