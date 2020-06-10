import {
  compose,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { betProviders } from 'weplay-events/constants/betProvidersData'

import pariLogo from './img/pari.png'
import goLogo from './img/gotv.png'
import dxracerLogo from './img/dxracer.png'
import hyperxLogo from './img/hyperx.png'
import repubGamersLogo from './img/republicofgamers.png'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withProps(({
    sponsors: [
      {
        url: pariLogo,
        name: 'pariMatch',
        link: betProviders.pariMatch.url.ru,
      },
      {
        url: dxracerLogo,
        name: 'dxracer',
        link: 'https://www.facebook.com/DXRacer/',
      },
      {
        url: hyperxLogo,
        name: 'hyperx',
        link: '',
      },
      {
        url: repubGamersLogo,
        name: 'repubGamersLogo',
        link: '',
      },
      {
        url: goLogo,
        name: 'kyivstar-go-tv',
        link: '',
      },
    ],
  })),
)

export default container
