# Koa TypeORM Server Example


## Getting Stated

### Installation

Clone the repository, then in the project root folder do:

```bash
yarn install
```

The server expects some environment variables to be set. If you are [developing locally with docker](#local-development-with-docker) you can rename the `.env.template` file to `.env` to get the default env vars needed to connect to the dockerised database.

### Local development with docker

If you have docker installed the project provides a dockerised postgres db instance against which you can run the server in dev mode. To build and start the instance in the rood folder run:

```bash
make up
```

This will run `docker-compose` and will build a postgres db image.

It will also start [adminer](https://www.adminer.org/) so you can manage the db more easily.

The dashboard will be running at [http://localhost:9090](http://localhost:9090)

You can log in with the following credentials:

```
type: postgreSQL
user: admin
password: example
database: users
```

To see the full list of `make` commands available checkout the `Makefile` in the root folder.

The data will be persisted in `~/postgres/typeorm`

## Available Scripts

In the project directory, you can run:

### `yarn start:dev`

Runs the app in development mode.<br />
Open [http://localhost:9080](http://localhost:9080) to view it in the browser.

The server uses `nodemon` in development and will auto restart every time you made changes.<br />

### `yarn test`

Launches the test runner.<br />

### `yarn build`

The project uses `TypeScript` and `ES6` features. To get it production ready we need to compile the code to standard JavaScript. Running the `build` script will build the app for production and put the compiled files in to the `lib` folder.<br />
Your app is ready to be deployed!

### `yarn start:prod`

Will run the compiled app in production mode.

### `yarn lint`

Will use `esLint` to lint the files.

### `yarn precommit`

This script runs before committing new changes to the repository. It will run the tests, lint the files and build the project. If at any step the script fails the commit will be aborted.

## Available endpoints

### /users

The follwoing methods are available:

• GET
- `/users` : will return an array with users set in the db. 

```
{ 
  data: [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Conner'
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Conner'
  }
]
}
```

You can query the results `/users?firstName=Sarah` will get all the results with first name set to Sarah.

- `users/1` : will return a single user with a matching `id`

```
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Conner'
  }
```

* POST

- `\user` : passing the following JSON payload to the endpoint will set a new user in to the db:

```
  {
    firstName: 'John',
    lastName: 'Conner'
  }
```

## File Structure

The top level folders in the project are as follow:

- **lib** - production ready build
- **src** - source code for the App

The _src_ folder contains the following suborders:

### `/app.ts`

This folder sets the Koa Js server and the corresponding middleware.

### `/db`

This folder sets the `TypeORM` database entities

### `/routes`

This folder defines all the API endpoints with their corresponding methods.

## Code Format

The project uses [eslint](https://eslint.org/) to keep the formatting consistent. It also follows the [JavaScript Standard Style](https://standardjs.com/) rules. Auto formatting is achieved with `Prettier.js` and enabled trough the `.vscode` configuration.

## Default ENV variables
The server expects certain environment variables to be set. Rename the `.env.template` file to `.env` to get the suggested env vars during development.

## Testing

The project uses `Jest` as a test runner. It follows the suggested folder structure by the `Jest` team and next to each module you will find a `__tests__` folder with unit tests around it.
