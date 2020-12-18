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
    { "asset": 'BTC', "free": '0.00000000', "locked": '0.00000000' },
    { "asset": 'LTC', "free": '0.00000000', "locked": '0.00000000' },
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