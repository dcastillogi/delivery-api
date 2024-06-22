# Delivery Api

Retrieve delivery estimates for specified locations according to the Interrapidismo pricing table.

## Delivery Categories

- `DA`: Dificil Acesso
- `N`: Nacional
- `L`: Local
- `R`: Regional

## Request Example

```curl
curl -X GET "https://delivery-api.dcastillogi.com/?origin=<origin_city_id>&destination=<destination_city_id>"
```

Replace `<origin_city_id>` and `<destination_city_id>` with the appropriate city IDs based on DANE.