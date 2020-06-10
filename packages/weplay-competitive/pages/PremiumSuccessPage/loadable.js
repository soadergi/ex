import loadable from '@loadable/component'
import React from 'react'

import InitialPreloader from 'weplay-components/InitialPreloader'

export default loadable(() => import(

  /* webpackPrefetch: true */
    './PremiumSuccessPage' // eslint-disable-line
), { fallback: (<InitialPreloader />) })
