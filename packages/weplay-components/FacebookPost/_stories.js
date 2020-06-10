import React from 'react'
import { storiesOf } from '@storybook/react'

import { FacebookPostMarkup } from './index'

storiesOf('weplay-smth/FacebookPostMarkup', module)
  .add('one state', () => (
    <FacebookPostMarkup
      postUrl="https://www.facebook.com/notes/weplay-esports/best-spidey-games/1410290182445251"
    />
  ))
