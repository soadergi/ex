import React from 'react'
import { storiesOf } from '@storybook/react'

import { SliderMarkup } from './index'

const PHOTOS = [
    'https://i.pinimg.com/originals/b3/cf/82/b3cf8221bf35baf3d4faa68473811fc9.jpg',
    'https://i.pinimg.com/originals/b3/cf/82/b3cf8221bf35baf3d4faa68473811fc9.jpg',
    'https://i.pinimg.com/originals/b3/cf/82/b3cf8221bf35baf3d4faa68473811fc9.jpg',
    'https://i.pinimg.com/originals/b3/cf/82/b3cf8221bf35baf3d4faa68473811fc9.jpg',
    'https://i.pinimg.com/originals/b3/cf/82/b3cf8221bf35baf3d4faa68473811fc9.jpg',
    'https://i.pinimg.com/originals/b3/cf/82/b3cf8221bf35baf3d4faa68473811fc9.jpg',
]
storiesOf('weplay-smth/SliderMarkup', module)
  .add('one state', () => (
    <SliderMarkup
    >
      {PHOTOS.map(photo => (
        <img
          key={photo}
          src={photo}
          alt="d"
        />
      ))}
    </SliderMarkup>
  ))
