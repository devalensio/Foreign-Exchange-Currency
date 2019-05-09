# Foreign Currency Exchange

This project helps us to calculate exchange rates easily.

### Prerequisites

[Node.js](https://nodejs.org/en/) (>=4.x, 8.x preferred), and Npm version 4+(Yarn preferred)

### Usage

```
git clone https://github.com/devalensio/foreign-exchange-currency.git
cd foreign-exchange-currency
npm install (npm i / yarn)
npm run serve
```

Go to http://localhost:8080/. If port 8080 is already in use on your machine, **the program will specify the available port (incremental) for you, for example, `8081` / `8082` ...**. Of course, you can temporarily replace the port using the following command:

```
PORT=8888 npm run serve
```

>**Additional supplement**： You need to make sure that PORT is a command that can be executed on your machine.

## Lints and fixes files

```
npm run lint
```

## Running the tests

```
npm run test:unit
```

### Break down into end to end tests

```
npm run test:e2e
```

## Dependent plugin list

- vue
- vue-router
- vuex
- axios
- vuetify
- vue-currency-filter
- sinon
- ... ...

## Deployment

```
npm run build
docker build -t shopee-test:0.0.1 .
docker run shopee-test:0.0.1
```

## Authors

* **Valensio Deva** - [devalensio](https://github.com/devalensio)

