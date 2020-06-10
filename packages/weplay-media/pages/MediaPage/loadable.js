import loadable from '@loadable/component'
import React from 'react'

import Skeleton from 'weplay-components/Skeleton'

export default loadable(() => import(

  /* webpackPrefetch: true */
  'weplay-media/pages/MediaPage/index' // eslint-disable-line comma-dangle
), { fallback: (<Skeleton count={10} />) })
