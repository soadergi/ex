import loadable from '@loadable/component'
import React from 'react'

import Skeleton from 'weplay-components/Skeleton'

export default loadable(() => import('./index'), {
  fallback: (<Skeleton count={10} />),
})
