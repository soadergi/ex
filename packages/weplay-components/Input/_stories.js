import React from 'react'
import { storiesOf } from '@storybook/react'

import { InputMarkup } from './index'

const actions = {
  // onPinTask: action('onPinTask'),
  // onArchiveTask: action('onArchiveTask'),
}
storiesOf('weplay-smth/InputMarkup', module)
  .add('one state', () => (
    <InputMarkup
      {...actions}
    />
  ))

