## Descrição da API

API Restful para cadastro de eventos.


### Endpoints


#### POST /api/event

Criar novo evento


##### Parameters

```
POST /api/event
{
	"event": "Christmas",
	"place": "North Pole",
	"date": "2018-12-25",
	"time": "00:00",
	"participants": [
		"Santa", "Hyenas", "Helpers"
	]
}
```

##### Responses

```
HTTP/1.1 201 Created
{
	"id": 2,
	"event": "Christmas",
	"place": "North Pole",
	"date": "2018-12-25",
	"time": "00:00",
	"participants": [
		"Santa", "Hyenas", "Helpers"
	],
	"created_at": "2018-02-07T12:00:00-02:00",
	"updated_at": null
}
```

#### GET /api/event

Listar todos os eventos


##### Parameters

```
GET /api/event
```

##### Responses

```
HTTP/1.1 200 OK
[
	{
		"id": 1,
		"event": "New Year",
		"place": "Worldwide",
		"date": "2018-01-01",
		"time": "00:00",
		"participants": [],
		"updated_at": null
		"created_at": "2018-02-07T12:00:00-02:00",
		"updated_at": "2018-02-07T15:45:00-02:00"
	}, {
		"id": 2,
		"event": "Christmas",
		"place": "North Pole",
		"date": "2018-12-25",
		"time": "00:00",
		"participants": [
			"Santa", "Hyenas", "Helpers"
		],
		"created_at": "2018-02-07T12:00:00-02:00",
	}
]
```

#### GET /api/event/[:id]

Exibir dados de um determinado Evento


##### Parameters

```
GET /api/event/1
```

##### Responses

```
HTTP/1.1 200 OK
{
	"id": 1,
	"event": "New Year",
	"place": "Worldwide",
	"date": "2018-01-01",
	"time": "00:00",
	"participants": [],
	"created_at": "2018-02-07T12:00:00-02:00",
	"updated_at": "2018-02-07T15:45:00-02:00"
}
```

```
HTTP/1.1 404 Not found
```

#### PUT /api/event/[:id]

Alterar os dados de um determinado evento


##### Parameters

```
PUT /api/event/1
{
	"event": "Next New Year",
	"place": "Worldwide",
	"date": "2019-01-01",
	"time": "00:00",
	"participants": []
}
```

##### Responses

```
HTTP/1.1 200 OK
{
	"id": 1,
	"event": "Next New Year",
	"place": "Worldwide",
	"date": "2019-01-01",
	"time": "00:00",
	"participants": [],
	"created_at": "2018-02-07T12:00:00-02:00",
	"updated_at": "2018-02-07T15:45:00-02:00"
}
```

```
HTTP/1.1 404 Not found
```


#### DELETE /api/event/[:id]

Excluir um evento


##### Parameters

```
DELETE /api/event/1
```

##### Responses

```
HTTP/1.1 204 No content
```

```
HTTP/1.1 404 Not found
```


