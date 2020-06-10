import loadable from '@loadable/component'
import React from 'react'

import InitialPreloader from 'weplay-components/InitialPreloader'

export default loadable(() => import(

  'weplay-media/pages/ColumnistsPage/index' // eslint-disable-line comma-dangle
), { fallback: <InitialPreloader /> })
