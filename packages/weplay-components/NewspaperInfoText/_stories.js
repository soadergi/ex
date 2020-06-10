import React from 'react'
import { storiesOf } from '@storybook/react'

import NewspaperInfoText from './index'

const actions = {
  // onPinTask: action('onPinTask'),
  // onArchiveTask: action('onArchiveTask'),
}
storiesOf('weplay-components/NewspaperInfoText', module)
  .add('one state', () => (
    <NewspaperInfoText
      {...actions}
    />
  ))
  .add('another state', () => (
    <NewspaperInfoText
      {...actions}
    />
  ))
