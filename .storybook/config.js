import { configure } from '@storybook/react'

function loadStories() {
  const context = require.context('../packages', true, /stories\/index\.js$/)

  context.keys().forEach(context)
}

configure(loadStories, module)
