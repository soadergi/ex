import React from 'react'

import Skeleton from 'weplay-components/Skeleton'

import styles from './MatchMember.scss'

const MatchMemberSkeleton = () => (
  <div className={styles.wrapper}>
    <div>
      <Skeleton
        circle
        width="128px"
        height="128px"
      />
    </div>
    <p className={styles.name}>
      <Skeleton
        width="100px"
      />
    </p>
  </div>
)

export default React.memo(MatchMemberSkeleton)
