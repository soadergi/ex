import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import 'weplay-core/styles/style.scss'
import 'weplay-core/sprites/dist/styles/sprite-styles.scss'
import 'weplay-core/sprites/dist/sprites/sprite.m.svg'
import 'weplay-core/sprites/dist/sprites/sprite.c.svg'
import 'weplay-core/sprites/dist/sprites/sprite.svg'
import { PROJECT_PREFIXS } from 'weplay-core/routes'
import { axios } from 'weplay-core/services/axios'

import TournamentsSubMenu from 'weplay-competitive/components/TournamentsSubMenu'

import EventsMobileSubMenu from 'weplay-events/components/EventsSubMenuPortal/EventsMobileSubMenu/EventsMobileSubMenu'

import MediaMobileMenu from 'weplay-media/components/MediaMobileMenu/MediaMobileMenu'

import AppAdapter from './AppAdapter/AppAdapter'
import BrowserRoutes from './BrowserRoutes'
import Providers from './Providers/Providers'
import createStore from './reduxs/store'
import { setupClickAnal } from './setupClickAnal'
import { setupSentry } from './setupSentry'

setupClickAnal(window)
setupSentry(window.location.origin)
const { persistor, store } = createStore(axios)

// TODO: rewrite tournaments custom submenu
const getCustomSubMenu = ({
  closeMobileMenu,
  project,
}) => {
  switch (project) {
    case PROJECT_PREFIXS.TOURNAMENT_PROJECT_PREFIX:
      return <TournamentsSubMenu closeMobileMenu={closeMobileMenu} />
    case PROJECT_PREFIXS.EVENT_PROJECT_PREFIX:
      return <EventsMobileSubMenu closeMobileMenu={closeMobileMenu} />
    case PROJECT_PREFIXS.MEDIA_PROJECT_PREFIX:
      return <MediaMobileMenu closeMobileMenu={closeMobileMenu} />
    default:
      return null
  }
}

if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  navigator.serviceWorker.register('/OneSignalSDKWorker.js')
    .then((registration) => {
      console.log('[SW] registered: ', registration)
    }).catch((registrationError) => {
      console.log('[SW] registration failed: ', registrationError)
    })
}
getCustomSubMenu.propTypes = {
  closeMobileMenu: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
}

ReactDOM.render(
  <Providers
    windowLocation={window.location}
    store={store}
    persistor={persistor}
  >
    <AppAdapter
      globalScope={window}
      getCustomSubMenu={getCustomSubMenu}
    >
      <BrowserRoutes />
    </AppAdapter>
  </Providers>,
  document.getElementById('app'),
)
