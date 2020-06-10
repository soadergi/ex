import React from 'react'
import { storiesOf } from '@storybook/react'

import PaperInfo from './index'

const actions = {
  // onPinTask: action('onPinTask'),
  // onArchiveTask: action('onArchiveTask'),
}
storiesOf('weplay-smth/PaperInfo', module)
  .add('one state', () => (
    <PaperInfo
      {...actions}
    />
  ))
  .add('another state', () => (
    <PaperInfo
      {...actions}
    />
  ))
