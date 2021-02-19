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

## Login

**Request:**
```json
POST /login HTTP/1.1

{
    "email": "myemail",
    "password": "mypass"
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK

{
    "id": "uuid"
}
```
**Failed Response:**
```json
HTTP/1.1 400 Bad Request

{
    "error": "BadRequest",
    "message": "message d'erreur"
}
```
---

## Register

**Request:**
```json
POST /register HTTP/1.1

{
    "email": "myemail",
    "password": "mypass"
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK

{
    "id": "uuid"
}
```
**Failed Response:**
```json
HTTP/1.1 400 Bad Request

{
    "error": "BadRequest",
    "message": "message d'erreur"
}
```