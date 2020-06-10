import React from 'react'
import classNames from 'classnames'

import Wrapper from 'weplay-competitive/components/Wrapper'

import VotingPool from './VotingPool/VotingPool'
import styles from './VotingInfo.scss'

export const VOTING_SIDES = {
  LEFT: 'left',
  RIGHT: 'right',
  SERVER: 'server',
}

const VotingInfo = () => (
  <div className={styles.block}>
    <Wrapper className={styles.wrapper}>
      <div className={styles.votingInfo}>
        <div className="u-text-center">
          <VotingPool
            isServer
            side={VOTING_SIDES.SERVER}
          />
        </div>
      </div>
      <div className={classNames(
        styles.user,
        styles.first,
      )}
      >
        <VotingPool
          side={VOTING_SIDES.LEFT}
          hasCoin
        />
      </div>
      <div className={classNames(
        styles.user,
        styles.second,
      )}
      >
        <VotingPool
          side={VOTING_SIDES.RIGHT}
          isReverse
        />
      </div>
    </Wrapper>
  </div>

)

export default React.memo(VotingInfo)
