# @5rabbits/test-1

_TODO:_ Add a short description for your library. It should probably match the field `description` on the `package.json` file.

## Usage

* Install with `yarn add @5rabbits/test-1`.
* Install peer dependencies (if you haven't already) `yarn add react@^16.0.0 react-dom@^16.0.0`.
* Use the component:

```es6
import Test1 from '@5rabbits/test-1'
import '@5rabbits/test-1/dist/test-1.css'

<Test1 />
```

[Demo](https://5rabbits.github.io/react-components)

## Props

| prop         | type                     | default     | required | description                                                                                                                                                                                                                      |
| :----------- | :----------------------- | :---------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| theme        | `'default'`, `'primary'` | `'default'` |          | Button theme.                                                                                                                                                                                                                    |
| locale       | string                   | `'en'`      |          | Language to display the component. `en` and `es` are supported by default, but you can add other languages using the `translations` prop.                                                                                        |
| translations | object                   |             |          | Extra locales for the component. Use [this file](https://github.com/5rabbits/react-components/blob/master/packages/@5rabbits/test-1/src/locale/en.js) as a template and pass the translations as `{ [locale]: [translations] }`. |

## Development

* Run `yarn start` to start building the library in watch mode.
* Write [stories](https://storybook.js.org) in the `stories/index.js` file.

## Testing

* Execute `yarn test` to run the test with [jest](https://facebook.github.io/jest/). Use `yarn test --watch` to run the tests in watch mode.
* After every run (even in watch mode), a summary coverage report will be displayed directly on the terminal and a full html report will be generated in `tests/coverage`.
