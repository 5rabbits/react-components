import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withReadme } from 'storybook-readme'
import readme from '../readme.md'
import TimeInput from '../dist/time-input'
import ControlledExample from './ControlledExample'

storiesOf('TimeInput', module)
  .addDecorator(withReadme([readme]))
  .add('empty', () => <TimeInput onChange={action('onChange')} />)
  .add('with initial value', () => (
    <TimeInput defaultValue={123} onChange={action('onChange')} />
  ))
  .add('not clearable', () => (
    <TimeInput
      defaultValue={123}
      clearable={false}
      onChange={action('onChange')}
    />
  ))
  .add('controlled', () => <ControlledExample onChange={action('onChange')} />)
