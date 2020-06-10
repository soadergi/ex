import React from 'react'
import { storiesOf } from '@storybook/react'

import Button, {
  BUTTON_VARIANT,
  BUTTON_COLOR,
  BUTTON_SIZE,
  ICON_SIDE,
} from './index'

storiesOf('weplay-components/Button', module)
  .add('Size SM', () => (
    <Button
      size={BUTTON_SIZE.SM}
    />
  ), {
    notes: 'All buttons have sizes',
  })
  .add('Size MD color CTA Variant Outline', () => (
    <Button
      variant={BUTTON_VARIANT.OUTLINE}
      color={BUTTON_COLOR.CTA}
    />
  ), {
    notes: 'Variant Outline has limited color variants',
  })
  .add('Size LG Color Danger Icon side Right', () => (
    <Button
      size={BUTTON_SIZE.LG}
      color={BUTTON_COLOR.DANGER}
      iconSide={ICON_SIDE.RIGHT}
      icon="facebook"
    />
  ), {
    notes: 'Set icon side',
  })
