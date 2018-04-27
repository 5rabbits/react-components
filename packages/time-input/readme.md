# @5rabbits/time-input [![npm](https://badge.fury.io/js/%405rabbits%2Ftime-input.svg)](https://www.npmjs.com/package/@5rabbits/time-input) [![Travis](https://api.travis-ci.org/5rabbits/time-input.svg?branch=master)](https://travis-ci.org/5rabbits/time-input) [![Codecov](https://codecov.io/gh/5rabbits/time-input/branch/master/graph/badge.svg)](https://codecov.io/gh/5rabbits/time-input)

A time input in `00h 00m` format.

## Usage

* Install with `yarn add @5rabbits/time-input`.
* Install peer dependencies (if you haven't already) `yarn add react@^16.0.0 react-dom@^16.0.0`. React 15 is also supported.
* Use the component:

```es6
import TimeInput from '@5rabbits/time-input'

<TimeInput />
```

[Demo](https://5rabbits.github.io/time-input)

## Props

| prop         | type   | default | required | description                                                                                                                          |
| :----------- | :----- | :------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| clearable    | bool   | `true`  |          | If `true` the input can be emptied (notifying value `null`). If `false` when the user tries to clear the text it will be set to `0`. |
| defaultValue | number |         |          | The initial value in minutes to use as an uncontrolled input.                                                                        |
| onChange     | func   |         |          | Callback that will be invoked when the value changes. The first argument will be the new value in minutes.                           |
| value        | number |         |          | The value in minutes to use as a controlled input.                                                                                   |

## Development

* Run `yarn start` to start building the library in watch mode.
* Write [stories](https://storybook.js.org) in the `stories/index.js` file.
* Run `yarn publish` to release a new version.

This project [lints](https://eslint.org/) and [prettifies](https://prettier.io) source files automatically before commiting.
