import React from 'react'
import { storiesOf } from '@storybook/react'

import Spoiler from './index'

const actions = {
  // onPinTask: action('onPinTask'),
  // onArchiveTask: action('onArchiveTask'),
}
storiesOf('weplay-smth/Spoiler', module)
  .add('one state', () => (
    <Spoiler
      {...actions}
    />
  ))
  .add('another state', () => (
    <Spoiler
      {...actions}
    />
  ))
