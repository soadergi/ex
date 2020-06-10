import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { $propEq } from 'weplay-core/$utils/$propEq'

import Label from 'weplay-components/Label'

import CoinFlip from 'weplay-competitive/components/CoinFlip'

import { useVotingPool } from './useVotingPool'
import VotingItem from './VotingItem/VotingItem'
import styles from './VotingPool.scss'

const VotingPool = ({
  side,
  isReverse,
  hasCoin,
  isServer,
}) => {
  const t = useTranslation()
  const votingPool = useVotingPool()

  const voteItems = useMemo(
    () => votingPool.filter($propEq('side', side)),
    [votingPool, side],
  )
  return (
    <>
      <p className={styles.title}>
        {isServer
          ? t('competitive.match.matchInfo.serverPick')
          : t('competitive.match.matchInfo.pickAndBan')}
      </p>
      <ul className={classNames(
        styles.block,
        {
          [styles.isReverse]: isReverse,
          [styles.isServer]: isServer,
        },
      )}
      >
        {hasCoin && (
        <li className={styles.item}>
          <CoinFlip />
        </li>
        )}
        {voteItems.length
          ? voteItems.map(voteItem => (
            <li
              key={voteItem.id}
              className={styles.item}
            >
              <VotingItem voteItem={voteItem} />
            </li>
          ))
          : (
            <li className={styles.item}>
              <Label
                color="white"
              >
                {t('competitive.match.matchInfo.tip')}
              </Label>
            </li>
          )}
      </ul>
    </>
  )
}

VotingPool.propTypes = {
  side: PropTypes.string.isRequired,
  isReverse: PropTypes.bool,
  hasCoin: PropTypes.bool,
  isServer: PropTypes.bool,
}

VotingPool.defaultProps = {
  // optional props
  isReverse: false,
  hasCoin: false,
  isServer: false,
}

export default React.memo(VotingPool)
