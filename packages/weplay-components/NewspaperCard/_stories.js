import React from 'react'
import { storiesOf } from '@storybook/react'

import { NewspaperCard } from './index'

const actions = {
  // onPinTask: action('onPinTask'),
  // onArchiveTask: action('onArchiveTask'),
}
storiesOf('weplay-media/pages/ArticlePage/Similars/SimilarCard', module)
  .add('one state', () => (
    <NewspaperCard
      {...actions}
    />
  ))
  .add('another state', () => (
    <NewspaperCard
      {...actions}
    />
  ))
