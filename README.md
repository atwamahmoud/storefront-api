## Storefront API

> Part of Udacity's Full-Stack nanodegree
## Setup

> You'll need a terminal which supports bash since the testing script is written in bash

1. To install required dependencies run `npm i` or `yarn`
2. Update the variables in `.env` && `.env.test` according to your needs

## Ports

1. The node server runs on `PORT` which is 8080 in `.env`
2. The db server runs on `POSTGRES_PORT` which is 8000 in `.env`


## Commands/Scripts

1. `npm run dev` or `yarn dev` starts a development server on the port in the `.env` file & also starts the db server
2. `npm run build` or `yarn build` builds the project for production in `build` directory
3. `npm run jasmine` or `yarn jasmine` runs jasmine for unit tesing
4. `npm run test` or `yarn test` builds the project then runs the unit tests
5. `npm run lint` or `yarn lint` runs eslint to check for style or code issues.
6. `npm run lint:fix` or `yarn lint:fix` similar to the previous but tries to fix all auto fixable issues
7. `npm run prettier` or `yarn prettier` runs prettier to improve & fix writing style
8. `npm run start` or `yarn start` runs the production build using the `.env` file (need the project to be build beforehand), db server & runs migrations.
9. `npm run db:run-server` or `yarn db:run-server` runs the db server using docker-compose
10. `npm run db:close-server` or `yarn db:close-server` closes the db server using docker-compose
11. `npm run db:close-server` or `yarn db:close-server` closes the db server using docker-compose
13. `npm run db:up` or `yarn db:up` runs `db-migrate up`
14. `npm run db:down` or `yarn db:down` runs `db-migrate down`
15. `npm run db:reset` or `yarn db:reset` runs `db-migrate reset`
16. `npm run db:drop` or `yarn db:drop` runs `db-migrate drop storefront_api`
17. `npm run apidoc` or `yarn apidoc` generates `apidoc.md`

After starting the server you can check the functionality of the project as detailed below

## Testing the API

Please refer to [apidoc.md](./apidoc.md) to check the available endpoints

## DB Schema

Please refer to  [db_schema.md](./db_schema.md) to check the db schema


## Environment Variables
### Dev

```
    PORT=8080
    POSTGRES_PASSWORD=password
    POSTGRES_USER=user
    POSTGRES_DB=storefront_api
    POSTGRES_PORT=8000
    POSTGRES_HOST=127.0.0.1
    SALT_ROUNDS=15
    PRIVATE_KEY=my_super_secret_private_key
```

### Test

```
    PORT=8080
    POSTGRES_PASSWORD=password
    POSTGRES_USER=test_user
    POSTGRES_DB=storefront_api_test
    POSTGRES_PORT=8000
    POSTGRES_HOST=127.0.0.1
    SALT_ROUNDS=15
    PRIVATE_KEY=my_super_secret_test_private_key
```