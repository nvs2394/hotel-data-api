## API

After the app started, go to http://localhost:3000/swagger to see the API documentation

Filter hotels by destination ID

```bash

curl -X 'GET' \
  'http://localhost:3000/v1/hotels?destinationId=5432' \
  -H 'accept: application/json'
```

Filter hotels by a list of hotel IDs

```bash
curl -X 'GET' \
  'http://localhost:3000/v1/hotels?hotelIds=iJhz&hotelIds=f8c9' \
  -H 'accept: application/json'
```

Filter hotels by both hotel IDs and destination ID

```bash
curl -X 'GET' \
  'http://localhost:3000/v1/hotels?hotelIds=iJhz&hotelIds=f8c9&destinationId=1122' \
  -H 'accept: application/json'

```