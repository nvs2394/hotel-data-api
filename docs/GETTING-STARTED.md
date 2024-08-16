
## Environments

This project was generated using and follows the [NestJS framework](https://docs.nestjs.com).


- **NodeJS** - latest version
- **Docker** 

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**
- **Node.js** - latest version

If you haven't set it up, please follow the commands below.

To install the latest version of Node.js, you can use the following script:

#### On macOS:

```bash
# Install Node.js using nvm (Node Version Manager)
# First, install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

# Load nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# Install the latest version of Node.js
nvm install node

# Verify installation
node -v
npm -v

```

## Installation

To install the required dependencies, run the following command:

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Developer guide

```bash
# Lint check
$ npm run lint

# ESLint fix
$ npm run lint --fix
```

## Docker

Run the following command to run the API within a Docker container

```bash
$ docker-compose up
```