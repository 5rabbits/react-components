# React components [![Build Status](https://travis-ci.org/5rabbits/react-components.svg?branch=master)](https://travis-ci.org/5rabbits/react-components) [![codecov](https://codecov.io/gh/5rabbits/react-components/branch/master/graph/badge.svg)](https://codecov.io/gh/5rabbits/react-components)

This is a monorepo for individual 5rabbits react components.

Demo/Docs: https://5rabbits.github.io/react-components

## Requirements

- NodeJS >= 6.9.0
- Yarn >= 1.0.0

## Packages

The `packages` directory holds each individual package. Each package has (at least) the following commands:

```shell
$ yarn build # Build the package for production
$ yarn start # Start the development server
$ yarn test # Run the tests
$ yarn test --watch # Run the tests in watch mode
```

## Global commands

The following commands are available at the root of this repository:

```shell
$ yarn create-package <name> # Creates a new individual package
$ yarn build # Builds all the packages for production
$ yarn start # Starts a storybook server for all packages
$ yarn test # Tests all packages
$ yarn lint # Lints all packages
$ yarn prettify # Auto formats all packages code
```

## Lerna

This project uses [lerna](https://lernajs.io/) to manage and publish the individual packages.

## Hooks

* All changes will be linted and prettified before commiting.
* Storybooks will be deployed automatically to github pages after publishing.
