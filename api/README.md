# Binance API
This API uses `POST` and `GET` request to communicate and HTTP [response codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to indenticate status and errors. All responses come in standard JSON. All requests must include a valid JSON body.

## Response Codes 
### Response Codes
```
200: Success
400: Bad request
401: Unauthorized
404: Cannot be found
405: Method not allowed
422: Unprocessable Entity 
50X: Server Error
```
### Example Error Message
```json
http code 400
{
    "code": "BadRequest",
    "message": "message d'erreur"
}

```

## Ping Binance

**Request:**
```json
GET /ping HTTP/1.1

{
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK

{
    "ping": true
}
```
---

## Get Candlesticks
**You send:**  The symbol, the interval, the limit.
**You get:** Nothing.

**Request:**
```json
GET /candles HTTP/1.1

{
}
```
| Query     | Type   | Required | Default | Description                                                                                    |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------- |
| symbol    | String | true     |
| interval  | String | false    | `5m`    | `1m`, `3m`, `5m`, `15m`, `30m`, `1h`, `2h`,<br>`4h`, `6h`, `8h`, `12h`, `1d`, `3d`, `1w`, `1M` |
| limit     | Number | false    | `500`   | Max `1000`                                                                                     |
| startTime | Number | false    |
| endTime   | Number | false    |
**Successful Response:**
```json
HTTP/1.1 200 OK

[
    {
        "openTime": 1608288600000,
        "open": "18806.09000000",
        "high": "18847.04000000",
        "low": "18800.00000000",
        "close": "18813.27000000",
        "volume": "7.34148800",
        "closeTime": 1608288899999,
        "quoteVolume": "138121.50300935",
        "trades": 742,
        "baseAssetVolume": "2.13053500",
        "quoteAssetVolume": "40103.57207439"
    },
    {
        "openTime": 1608288900000,
        "open": "18813.12000000",
        "high": "18822.31000000",
        "low": "18781.62000000",
        "close": "18811.64000000",
        "volume": "9.18230500",
        "closeTime": 1608289199999,
        "quoteVolume": "172629.91963114",
        "trades": 484,
        "baseAssetVolume": "3.11433000",
        "quoteAssetVolume": "58553.20340724"
    }
]
```
**Failed Response:**
```json
HTTP/1.1 400 Bad Request

{
    "code": "BadRequest",
    "message": "message d'erreur"
}
```
---

## Get Account infos
**You get:** Account infos.

**Request:**
```json
GET /account/infos HTTP/1.1

{
}
**Successful Response:**
```json
HTTP/1.1 200 OK

{
  "makerCommission": 10,
  "takerCommission": 10,
  "buyerCommission": 0,
  "sellerCommission": 0,
  "canTrade": true,
  "canWithdraw": true,
  "canDeposit": true,
  "balances": [
    { "asset": "BTC", "free": "0.00000000", "locked": "0.00000000" },
    { "asset": "LTC", "free": "0.00000000", "locked": "0.00000000" },
  ]
}
```
**Failed Response:**
```json
HTTP/1.1 400 Bad Request

{
    "code": "BadRequest",
    "message": "message d'erreur"
}
``` 
---

## Pass an order
**You send:**  The symbol, the amount, the side.\
**You get:** The order recap.

**Request:**
```json
POST /order HTTP/1.1

{
}
```
| Query            | Type   | Required | Default  | Description                                                         |
| ---------------- | ------ | -------- | -------- | ------------------------------------------------------------------- |
| symbol           | String | true     |
| side             | String | true     |          | `BUY`,`SELL`                                                        |
| type             | String | false    | `LIMIT`  | `LIMIT`, `MARKET`                                                   |
| quantity         | Number | true     |
| price            | Number | true     |          | Optional for `MARKET` orders                                        |
| timeInForce      | String | false    | `GTC`    | `FOK`, `GTC`, `IOC`                                                 |
| newClientOrderId | String | false    |          | A unique id for the order. Automatically generated if not sent.     |
| stopPrice        | Number | false    |          | Used with stop orders                                               |
| newOrderRespType | String | false    | `RESULT` | Returns more complete info of the order. `ACK`, `RESULT`, or `FULL` |
| icebergQty       | Number | false    |          | Used with iceberg orders                                            |
| recvWindow       | Number | false    |

Additional mandatory parameters based on `type`:

| Type                | Additional mandatory parameters                 |
| ------------------- | ----------------------------------------------- |
| `LIMIT`             | `timeInForce`, `quantity`, `price`              |
| `MARKET`            | `quantity`                                      |
| `STOP_LOSS`         | `quantity`, `stopPrice`                         |
| `STOP_LOSS_LIMIT`   | `timeInForce`, `quantity`, `price`, `stopPrice` |
| `TAKE_PROFIT`       | `quantity`, `stopPrice`                         |
| `TAKE_PROFIT_LIMIT` | `timeInForce`, `quantity`, `price`, `stopPrice` |
| `LIMIT_MAKER`       | `quantity`, `price`                             |

- `LIMIT_MAKER` are `LIMIT` orders that will be rejected if they would immediately match and trade as a taker.
- `STOP_LOSS` and `TAKE_PROFIT` will execute a `MARKET` order when the `stopPrice` is reached.
- Any `LIMIT` or `LIMIT_MAKER` type order can be made an iceberg order by sending an `icebergQty`.
- Any order with an `icebergQty` MUST have `timeInForce` set to `GTC`.
**Successful Response:**
```json
HTTP/1.1 200 OK

{
  "symbol": "XLMETH",
  "orderId": 1740797,
  "clientOrderId": "1XZTVBTGS4K1e",
  "transactTime": 1514418413947,
  "price": "0.00020000",
  "origQty": "100.00000000",
  "executedQty": "0.00000000",
  "status": "NEW",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "side": "BUY"
}
```
**Failed Response:**
```json
HTTP/1.1 400 Bad Request

{
    "code": "BadRequest",
    "message": "message d'erreur"
}
```

## Total balance in USD

**Request:**
```json
GET /account/totalBalance HTTP/1.1

{
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK

{
    "balance": 5000
}
```

## All balances in USD

**Request:**
```json
GET /account/allBalances HTTP/1.1

{
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK

{
    "BTC": 5000,
    "ETH": 123
}
```