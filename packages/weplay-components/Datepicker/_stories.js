import React from 'react'
import { storiesOf } from '@storybook/react'

import { DatepickerMarkup } from './index'

const actions = {
  // onPinTask: action('onPinTask'),
  // onArchiveTask: action('onArchiveTask'),
}
storiesOf('weplay-smth/DatePickerMarkup', module)
  .add('one state', () => (
    <DatepickerMarkup
      {...actions}
    />
  ))
  .add('another state', () => (
    <DatepickerMarkup
      {...actions}
    />
  ))
