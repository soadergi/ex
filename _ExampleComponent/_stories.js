import React from 'react'
import { storiesOf } from '@storybook/react'

import { ExampleComponent } from './ExampleComponent'

const actions = {
  // onPinTask: action('onPinTask'),
  // onArchiveTask: action('onArchiveTask'),
}
storiesOf('weplay-smth/ExampleComponent', module)
  .add('one state', () => (
    <ExampleComponent
      {...actions}
    />
  ))
  .add('another state', () => (
    <ExampleComponent
      {...actions}
    />
  ))
