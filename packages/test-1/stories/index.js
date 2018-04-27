import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, select, boolean } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import readme from '../readme.md'
import Test1 from '../dist/test-1'
import '../dist/test-1.css'

storiesOf('Test1', module)
  .addDecorator(withReadme([readme]))
  .addDecorator(withKnobs)
  .add('with onClick handler', () => (
    <Test1
      disabled={boolean('Disabled', false)}
      onClick={action('onClick')}
      theme={select(
        'Theme',
        {
          default: 'Default',
          primary: 'Primary',
        },
        'default'
      )}
    />
  ))
