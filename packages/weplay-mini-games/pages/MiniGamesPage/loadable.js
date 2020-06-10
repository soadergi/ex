import React from 'react'

import { createLoadable } from 'weplay-components/createLoadable'
import InitialPreloader from 'weplay-components/InitialPreloader'

export default createLoadable({
  loadModule: () => import(

    './MiniGamesPage' // eslint-disable-line comma-dangle
  ),
  fallback: <InitialPreloader />,
})
