import React from 'react'
import classNames from 'classnames'

import Skeleton from 'weplay-components/Skeleton'

import styles from './styles.scss'

const CopyLinkSkeleton = skeletonOptions => (
  <span
    className={classNames(
      styles.copyLink,
    )}
  >
    <Skeleton
      {...skeletonOptions}
    />
  </span>

)
export default React.memo(CopyLinkSkeleton)
