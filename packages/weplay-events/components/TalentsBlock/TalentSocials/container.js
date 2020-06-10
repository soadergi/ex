import {
  compose,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withProps(({
    playerSocials: [
      {
        id: 1,
        title: 'twitch',
        type: 'twitch',
        url: '#',
      },
      {
        id: 2,
        title: 'twitter',
        type: 'twitter',
        url: '#',
      },
      {
        id: 3,
        title: 'youtube',
        type: 'youtube',
        url: '#',
      },
      {
        id: 4,
        title: 'twitch',
        type: 'twitch',
        url: '#',
      },
      {
        id: 5,
        title: 'twitter',
        type: 'twitter',
        url: '#',
      },
      {
        id: 6,
        title: 'youtube',
        type: 'youtube',
        url: '#',
      },
    ],
  })),

)

export default container
