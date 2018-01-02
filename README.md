# Poker API

## Overview
This API has been done expecting to fulfill the mandatory challenge MC01 of ISADevDays17. You can watch the [original statment](https://github.com/javrd/poker-api/blob/master/MC01%20-%20API%20para%20Manos%20de%20Poker.pdf) in spanish.

The server was generated by the [swagger-codegen](https://github.com/swagger-api/swagger-codegen) project, in order to get a quick started API.

Please, note that this is a developer version and it could has bugs or it could not be as efficient as it should be. Feel free to modify whatever you want.

## Running the server

### Bare metal:
It has been tested only on node 8.9.3.
To run the server, run:

```
npm install
npm start
```

### Docker:

```
docker build -t poker-api .
docker run -it -v "$(pwd):/home/node" -p 8080:8080 -p 5858:5858 poker-api
```

### Docker-compose:

```
docker-compose up
```
## Debugging
You can use remote debugging in order to debug the code that is running on docker. The project is already configured to do a remote debugging. You can use Visual Code with this launch.json by using your localRoot path:
```
{
    "configurations": [
        {
            "name": "Attach",
            "type": "node",
            "request": "attach",
            "port": 5858,
            "address": "localhost",
            "restart": true,
            "localRoot": "/path/to/this/repository",
            "remoteRoot": "/home/node/"
        }
    ]
}
```

## Testing
To view the Swagger UI interface open http://localhost:8080/docs.

Please, note that the example from the pdf can't be tested because attributes names are in spanish. Use that json instead:
```
[{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"2","suit":"H"},{"value":"3","suit":"D"},{"value":"5","suit":"S"},{"value":"9","suit":"C"},{"value":"K","suit":"D"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"2","suit":"C"},{"value":"3","suit":"H"},{"value":"4","suit":"S"},{"value":"8","suit":"C"},{"value":"A","suit":"H"}]}],"jackpot":10000},{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"2","suit":"H"},{"value":"3","suit":"D"},{"value":"5","suit":"S"},{"value":"9","suit":"C"},{"value":"K","suit":"D"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"2","suit":"D"},{"value":"3","suit":"H"},{"value":"5","suit":"C"},{"value":"9","suit":"S"},{"value":"K","suit":"H"}]}],"jackpot":0},{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"2","suit":"H"},{"value":"4","suit":"S"},{"value":"4","suit":"C"},{"value":"2","suit":"D"},{"value":"4","suit":"H"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"2","suit":"S"},{"value":"8","suit":"S"},{"value":"A","suit":"S"},{"value":"Q","suit":"S"},{"value":"3","suit":"S"}]}],"jackpot":21000},{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"2","suit":"H"},{"value":"3","suit":"D"},{"value":"5","suit":"S"},{"value":"9","suit":"C"},{"value":"K","suit":"D"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"2","suit":"C"},{"value":"3","suit":"H"},{"value":"4","suit":"S"},{"value":"8","suit":"C"},{"value":"K","suit":"H"}]},{"player":"Maradona","bet":40000,"cards":[{"value":"2","suit":"H"},{"value":"4","suit":"D"},{"value":"3","suit":"S"},{"value":"7","suit":"C"},{"value":"A","suit":"D"}]}],"jackpot":0}]
```

Cristiano has a poker and Neymar has a straight flush:
```
[{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"A","suit":"H"},{"value":"A","suit":"D"},{"value":"A","suit":"S"},{"value":"A","suit":"C"},{"value":"9","suit":"D"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"2","suit":"C"},{"value":"3","suit":"C"},{"value":"4","suit":"C"},{"value":"5","suit":"C"},{"value":"6","suit":"C"}]}],"jackpot":10000}]
```

Cristiano has a poker and Neymar has a full:
```
[{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"A","suit":"H"},{"value":"A","suit":"D"},{"value":"A","suit":"S"},{"value":"A","suit":"C"},{"value":"9","suit":"D"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"5","suit":"C"},{"value":"5","suit":"S"},{"value":"5","suit":"H"},{"value":"4","suit":"C"},{"value":"4","suit":"H"}]}],"jackpot":10000}]
```

Cristiano has a flush and Neymar has a full:
```
[{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"3","suit":"S"},{"value":"2","suit":"S"},{"value":"7","suit":"S"},{"value":"A","suit":"S"},{"value":"J","suit":"S"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"5","suit":"C"},{"value":"5","suit":"S"},{"value":"5","suit":"H"},{"value":"4","suit":"C"},{"value":"4","suit":"H"}]}],"jackpot":10000}]
```

Cristiano has a flush and Neymar has a straight:
```
[{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"3","suit":"S"},{"value":"2","suit":"S"},{"value":"7","suit":"S"},{"value":"A","suit":"S"},{"value":"J","suit":"S"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"5","suit":"C"},{"value":"2","suit":"H"},{"value":"6","suit":"H"},{"value":"4","suit":"C"},{"value":"3","suit":"H"}]}],"jackpot":10000}]
```

Cristiano has three of a kind and Neymar has a straight:
```
[{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"3","suit":"S"},{"value":"3","suit":"D"},{"value":"3","suit":"C"},{"value":"A","suit":"S"},{"value":"J","suit":"S"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"5","suit":"C"},{"value":"2","suit":"H"},{"value":"6","suit":"H"},{"value":"4","suit":"C"},{"value":"3","suit":"H"}]}],"jackpot":10000}]
```

Cristiano has three of a kind and Neymar has two pairs:
```
[{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"3","suit":"S"},{"value":"3","suit":"D"},{"value":"3","suit":"C"},{"value":"A","suit":"S"},{"value":"J","suit":"S"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"J","suit":"C"},{"value":"2","suit":"H"},{"value":"J","suit":"H"},{"value":"K","suit":"C"},{"value":"K","suit":"H"}]}],"jackpot":10000}]
```

Cristiano has a pair and Neymar has two pairs:
```
[{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"3","suit":"S"},{"value":"3","suit":"D"},{"value":"4","suit":"C"},{"value":"A","suit":"S"},{"value":"J","suit":"S"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"J","suit":"C"},{"value":"2","suit":"H"},{"value":"J","suit":"H"},{"value":"K","suit":"C"},{"value":"K","suit":"H"}]}],"jackpot":10000}]
```

Cristiano has a pair and Neymar has an A:
```
[{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"3","suit":"S"},{"value":"3","suit":"D"},{"value":"4","suit":"C"},{"value":"A","suit":"S"},{"value":"J","suit":"S"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"7","suit":"C"},{"value":"2","suit":"H"},{"value":"J","suit":"H"},{"value":"K","suit":"C"},{"value":"A","suit":"H"}]}],"jackpot":10000}]
```

Cristiano has a 9 and Neymar has an A:
```
[{"plays":[{"player":"Cristiano","bet":1000,"cards":[{"value":"2","suit":"S"},{"value":"3","suit":"D"},{"value":"4","suit":"C"},{"value":"5","suit":"S"},{"value":"9","suit":"S"}]},{"player":"Neymar","bet":20000,"cards":[{"value":"7","suit":"C"},{"value":"2","suit":"H"},{"value":"J","suit":"H"},{"value":"K","suit":"C"},{"value":"A","suit":"H"}]}],"jackpot":10000}]
```
