import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { text, boolean, select } from '@storybook/addon-knobs'

import { Activity, modifiers } from './index'

const actions = {
}

storiesOf('weplay-components/Activity', module)
  .add('usual', () => (
    <Activity
      activityIcon={select('activityIcon', [
        'clock',
        'comment',
      ], 'clock')}
      modifications={[select('modifications', modifiers, 'icon')]}
      {...actions}
    >
      {text('text', 'icon')}
    </Activity>
  ))
