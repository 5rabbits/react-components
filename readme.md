# React components [![Build Status](https://travis-ci.org/5rabbits/react-components.svg?branch=master)](https://travis-ci.org/5rabbits/react-components) [![codecov](https://codecov.io/gh/5rabbits/react-components/branch/master/graph/badge.svg)](https://codecov.io/gh/5rabbits/react-components)

This is a monorepo for individual 5rabbits react components.

Demo/Docs: https://5rabbits.github.io/react-components

## Requirements

* NodeJS >= 6.9.0
* Yarn >= 1.0.0

## Packages

The `packages` directory holds each individual package. Each package has (at least) the following commands:

```shell
# Build the package for production
$ yarn build

# Start the development server
$ yarn start

# Run the tests
$ yarn test

# Run the tests in watch mode
$ yarn test --watch
```

## Global commands

The following commands are available at the root of this repository:

```shell
# Creates a new individual package
$ yarn create-package <name>

# Builds all the packages for production
$ yarn build

# Starts a storybook server for all packages
$ yarn start

# Tests all packages
$ yarn test

# Lints all packages
$ yarn lint

# Auto formats all packages code
$ yarn prettify
```

## Lerna

This project uses [lerna](https://lernajs.io/) to manage and publish the individual packages.

## Hooks

* All changes will be linted and prettified before commiting.
* Storybooks will be deployed automatically to github pages after publishing.
