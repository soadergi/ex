import React from 'react'

import { createLoadable } from 'weplay-components/createLoadable'
import InitialPreloader from 'weplay-components/InitialPreloader'

export default createLoadable({
  loadModule: () => import(
    /* webpackPrefetch: true */
    './TournamentsListPage'
  ),
  fallback: <InitialPreloader />,
})
