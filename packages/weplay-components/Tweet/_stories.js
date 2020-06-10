import React from 'react'
import { storiesOf } from '@storybook/react'

import { TweetMarkup } from './index'

storiesOf('weplay-smth/TweetMarkup', module)
  .add('one state', () => (
    <TweetMarkup
      tweetId="1125188426934902784"
    />
  ))
